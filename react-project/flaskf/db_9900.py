#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

# from werkzeug.security import generate_password_hash

import re
import json
from datetime import date
import time
import string, random


def match_location(location):
    addr_l = db.reference('address').get()
    result = []
    for id in addr_l:
        addr = addr_l[id]
        str_addr = addr["street number"] + " " + addr["street name"]
        str_addr += ", " + addr["suburb"]
        find_by_name = re.search(location, str_addr)
        find_by_postcode = re.search(location, addr["postcode"])
        find_by_city = re.search(location, addr["city"])
        if find_by_name:
            result += str_addr
        elif find_by_postcode:
            result += addr["postcode"]
        elif find_by_city:
            result += addr["city"]
    return result


# search part
def search(filters):
    if filters == None or filters == {}:
        return search_all()

    no_location = 'location' not in filters or filters['location'] == [] or filters['location'] == None
    no_check_in = 'check_in_time' not in filters or filters['check_in_time'] == "" or filters['check_in_time'] == None
    no_check_out = 'check_out_time' not in filters or filters['check_out_time'] == "" or filters['check_out_time'] == None
    no_guest_num = 'guest_num' not in filters or filters['guest_num'] == "" or filters['guest_num'] == None
    no_upper_price = 'upper_price' not in filters or filters['upper_price'] == "" or filters['upper_price'] == None
    no_lower_price = 'lower_price' not in filters or filters['lower_price'] == "" or filters['lower_price'] == None
    no_amenities = 'amenities' not in filters or filters['amenities'] == "" or filters['amenities'] == None or set(
        list(filters['amenities'].values())) == set([""])
    no_rules = 'rules' not in filters or filters['rules'] == "" or filters['rules'] == None or set(
        list(filters['rules'].values())) == set([""])

    null_filters = (no_location and no_check_in and no_check_out
                    and no_guest_num) and (no_upper_price and no_lower_price
                                           and no_amenities and no_rules)

    if null_filters:
        return search_all()

    addr_l = db.reference('address').get()
    loc_l = {}
    # find all guest_num matched accommodations
    ref_acco = db.reference('accommodations')
    if no_guest_num:
        acco_l = ref_acco.get()
    else:
        acco_l = ref_acco.order_by_child('guests').equal_to(
            filters['guest_num']).get()
        addr_l = {x: addr_l[x] for x in addr_l if x in acco_l}

    # use re find nearest location
    if no_location:
        for id in addr_l:
            addr = addr_l[id]
            str_addr = addr["street number"] + " " + addr["street name"]
            str_addr += ", " + addr["suburb"]
            loc_l[id] = {}
            loc_l[id]['address'] = str_addr
            loc_l[id]['postcode'] = addr['postcode']
            loc_l[id]['city'] = addr['city']
    else:
        location = filters['location']
        for id in addr_l:
            # matched = False
            for l in location:
                addr = addr_l[id]
                acco = acco_l[id]
                str_addr = addr["street number"] + " " + addr["street name"]
                str_addr += ", " + addr["suburb"]
                str_title = acco['title']
                find_by_addr = re.search(l, str_addr)
                find_by_postcode = re.search(l, addr["postcode"])
                find_by_city = re.search(l, addr["city"])
                find_by_title = re.search(l, str_title)
                if find_by_addr or find_by_postcode or find_by_city or find_by_title:
                    loc_l[id] = {}
                    loc_l[id]['address'] = str_addr
                    loc_l[id]['postcode'] = addr['postcode']
                    loc_l[id]['city'] = addr['city']

    # combine two dict
    final = {}
    if no_check_in:
        check_in_time = None
    else:
        check_in_time = filters['check_in_time']
    if no_check_out:
        check_out_time = None
    else:
        check_out_time = filters['check_out_time']
    for id in loc_l:
        if id in acco_l.keys():
            acco = acco_l[id]
            available = acco["available"]
            if is_available(available, check_in_time, check_out_time):
                final[id] = acco
                final[id]['address'] = loc_l[id]['address']
                final[id]['postcode'] = loc_l[id]['postcode']
                final[id]['city'] = loc_l[id]['city']

    # query = ref_acco.order_by_child('price')
    # if 'upper_price' in filters and filters['upper_price'] != "":
    #     query = query.end_at(filters['upper_price'])
    # if 'lower_price' in filters and filters['lower_price'] != "":
    #     query = query.end_at(filters['lower_price'])
    # id_l = query.get()
    # final = {id: final[id] for id in final if id in id_l.keys()}

    if not no_upper_price:
        final = {
            id: final[id]
            for id in final if final[id]['price'] <= filters['upper_price']
        }

    if not no_lower_price:
        final = {
            id: final[id]
            for id in final if final[id]['price'] >= filters['lower_price']
        }

    if not no_amenities:
        tmp = {id: final[id] for id in final}
        for id in tmp:
            matched = True
            for i in filters['amenities']:
                if i in tmp[id]['amenities'] and filters['amenities'][i] != '':
                    if filters['amenities'][i] != int(tmp[id]['amenities'][i]):
                        matched = False
                        break
            if not matched:
                del (final[id])

    if not no_rules:
        tmp = {id: final[id] for id in final}
        for id in tmp:
            matched = True
            for i in filters['rules']:
                if i in tmp[id]['rules'] and filters['rules'][i] != '':
                    if filters['rules'][i] != int(tmp[id]['rules'][i]):
                        matched = False
                        break
            if not matched:
                del (final[id])

    reviews = search_review()
    for id in final:
        final[id]['review'] = {
            i: reviews[i]
            for i in reviews if reviews[i]['acco_id'] == id
        }

    result = {}
    result['number'] = len(final)
    result['data'] = final
    return result


def search_all():
    addr_l = db.reference('address').get()
    acco_l = db.reference('accommodations').get()
    reviews = search_review()
    for id in addr_l:
        addr = addr_l[id]
        str_addr = addr["street number"] + " " + addr["street name"]
        str_addr += ", " + addr["suburb"]
        acco_l[id]['address'] = str_addr
        acco_l[id]['postcode'] = addr['postcode']
        acco_l[id]['city'] = addr['city']
        acco_l[id]['review'] = {
            i: reviews[i]
            for i in reviews if reviews[i]['acco_id'] == id
        }
    result = {}
    result['number'] = len(acco_l)
    result['data'] = acco_l

    return result


def is_available(available, check_in_time=None, check_out_time=None):
    today = date.today()

    if check_in_time != None and check_out_time != None:
        check_in = (date.fromtimestamp(int(check_in_time)) - today).days
        check_out = (date.fromtimestamp(int(check_out_time)) - today).days
        if check_in < 0 or check_in > 31:
            return False
        elif check_out <= check_in or check_out > 31:
            return False
        else:
            return '1' in available[check_in:check_out]
    elif check_in_time == None and check_out_time != None:
        check_out = (date.fromtimestamp(int(check_out_time)) - today).days
        if check_out < 1 or check_out > 31:
            return False
        else:
            return '1' in available[:check_out]
    elif check_out_time == None and check_in_time != None:
        check_in = (date.fromtimestamp(int(check_in_time)) - today).days
        if check_in < 0 or check_in >= 31:
            return False
        else:
            return '1' in available[check_in:]
    else:
        return '1' in available


def insert_user(username, password, email, phone):
    timestamp = str(time.time()).split('.')[0]
    ref_un = db.reference("usernames")
    ref_u = db.reference("users")
    list_ref_un = list(ref_un.order_by_value().get().values())
    if user_exist(username):
        return False
    elif email_exist(email):
        return False
    else:
        new_user_id = str(int(list_ref_un[-1]) + 1)
        #print(list_ref_un)
        ref_u.child(new_user_id).set(
            json.loads(
                json.dumps({
                    "username": username,
                    "password": password,
                    "email": email,
                    "phone": phone,
                    "timestamp": timestamp
                })))
        ref_un.update(json.loads(json.dumps({username: new_user_id})))
        return True
    return True


def search_user(email):
    if db.reference("users").order_by_child("email").equal_to(email).get():
        user_info = db.reference("users").order_by_child("email").equal_to(
            email).get()
        user_id = list(user_info.keys())[0]
        user_info = list(user_info.values())[0]
        email = user_info["email"]
        phone = user_info["phone"]
        username = user_info["username"]
        tmp = {}
        tmp['email'] = email
        tmp['phone'] = phone
        tmp['username'] = username
        tmp['user_id'] = user_id
        result = json.loads(json.dumps(tmp))

        #print(user_info)
        #print(result)
        return result
    return None


def user_exist(username):
    result = list(
        db.reference('usernames').order_by_key().equal_to(username).get())
    return len(result) == 1


def email_exist(email):
    result = list(
        db.reference('users').order_by_child('email').equal_to(email).get())
    return len(result) == 1


def user_id_exist(user_id):
    result = list(
        db.reference('usernames').order_by_value().equal_to(user_id).get())
    # print("1")
    return len(result) == 1


# update the history of browsing data
def update_history(acco_id,
                   check_in_time,
                   check_out_time,
                   vcode,
                   message='',
                   user_id=None,
                   name=None,
                   email=None,
                   contact=None):
    # ref_h = db.reference("history").push()
    his_id = str(time.time()).replace('.', '')
    if db.reference('history').get():
        ref_h = db.reference('history').child(his_id)
    else:
        ref_h = db.reference('history/' + his_id)
    content = {}
    content['timestamp'] = str(time.time()).split('.')[0]
    content['check_in_time'] = check_in_time
    content['check_out_time'] = check_out_time
    content['acco_id'] = acco_id
    content['message'] = message
    content['vcode'] = vcode
    content['status'] = 'ready'
    if user_id != None:
        content['user_id'] = user_id
    if name != None:
        content['name'] = name
    if email != None:
        content['email'] = email
    if contact != None:
        content['contact'] = contact
    ref_h.set(json.loads(json.dumps(content)))
    # return ref_h.key
    return his_id


def get_history(his_id, email, vcode):
    history = db.reference('history').child(his_id).get()
    if history == None:
        message = "Dear customer, your order is not found. Please check your order id."
        return None, message

    if not match_email(his_id, email):
        message = "Dear customer, your email is not correct. Please check your email."
        return None, message

    if not match_vcode(his_id, vcode):
        message = "Dear customer, your vcode is not correct. Please check your order id."
        return None, message

    message = "Dear customer, your order {} is found.".format(his_id)
    return history, message


def search_history(user_id=None, acco_id=None, email=None, timestamp=None):
    if user_id != None:
        his = db.reference('history').order_by_child('user_id').equal_to(
            user_id).get()
        his_copy = {id: his[id] for id in his if id in his.keys()}
    else:
        his = db.reference('history').get()
        his_copy = {id: his[id] for id in his if id in his.keys()}
    if acco_id != None:
        tmp = {id: his_copy[id] for id in his_copy}
        for id in tmp:
            if acco_id != tmp[id]['acco_id']:
                del (his_copy[id])
    if email != None:
        tmp = {id: his_copy[id] for id in his_copy}
        for id in tmp:
            if acco_id != tmp[id]['email']:
                del (his_copy[id])
    if timestamp != None:
        tmp = {id: his_copy[id] for id in his_copy}
        for id in tmp:
            if acco_id != tmp[id]['timestamp']:
                del (his_copy[id])
    return his_copy


def delete_history(his_id):
    history = db.reference("history").child(his_id).get()
    if history:
        db.reference("history").child(his_id).update({'status': 'cancelled'})
        return his_id
    else:
        return None


def update_available(acco_id, check_in_time, check_out_time, value):
    ref_a = db.reference("accommodations")
    acco = ref_a.child(acco_id).get()
    if acco == None:
        return False
    available = acco['available']

    today = date.today()
    result = ""
    check_in = (date.fromtimestamp(int(check_in_time)) - today).days
    check_out = (date.fromtimestamp(int(check_out_time)) - today).days
    if check_in < 0:
        check_in = 0
    if check_out < 0:
        check_out = 0
    if value == '0':
        if is_available(available, check_in_time, check_out_time):
            result = available[:check_in]
            result += value * (check_out - check_in)
            result += available[check_out:]
            json_acco = json.loads(json.dumps({"available": result}))
            ref_a.child(acco_id).update(json_acco)
            return True
        else:
            return False
    else:
        if '1' in available[check_in:check_out]:
            return False
        result = available[:check_in]
        result += '1' * (check_out - check_in)
        result += available[check_out:]
        json_acco = json.loads(json.dumps({"available": result}))
        ref_a.child(acco_id).update(json_acco)
        return True


def generate_vcode():
    pos = random.randint(0, 5)
    vcode = random.sample(string.printable[0:62], 4)
    vcode.insert(pos, str(random.randint(0, 9)))
    return ''.join(vcode)


def booking(user_id, acco_id, check_in_time, check_out_time, message):
    ref_a = db.reference("accommodations")
    acco = ref_a.child(acco_id).get()
    if update_available(acco_id, check_in_time, check_out_time, '0'):
        vcode = generate_vcode()
        order_id = update_history(
            acco_id,
            check_in_time,
            check_out_time,
            vcode,
            message=message,
            user_id=user_id)
        feedback = "Dear customer, your order of {} is success. Your Order id is {}. Please check in at {}. Your verification number is {}.".format(
            acco['title'], order_id, date.fromtimestamp(check_in_time), vcode)
        return order_id, vcode, feedback
    else:
        feedback = "Dear customer, your order of {} is not available.  Please check other properties.".format(
            acco_id)
        return None, None, feedback


def booking_without_login(name,
                          email,
                          contact,
                          acco_id,
                          check_in_time,
                          check_out_time,
                          message,
                          user_id=None):
    ref_a = db.reference("accommodations")
    acco = ref_a.child(acco_id).get()
    if update_available(acco_id, check_in_time, check_out_time, '0'):
        vcode = generate_vcode()
        order_id = update_history(
            acco_id,
            check_in_time,
            check_out_time,
            vcode,
            message=message,
            name=name,
            email=email,
            contact=contact,
            user_id=user_id)
        feedback = "Dear customer, your order of {} is success. Your Order id is {}. Please check in at {}. Your verification number is {}.".format(
            acco['title'], order_id, date.fromtimestamp(int(check_in_time)),
            vcode)
        return order_id, vcode, feedback
    else:
        feedback = "Dear customer, your order of {} is not available.  Please check other properties.".format(
            acco_id)
        return None, None, feedback


def cancel_booking(his_id, email, vcode):
    history = db.reference('history').child(his_id).get()

    if not history:
        feedback = "Dear customer, your order of {} is not found.".format(
            his_id)
        return None, feedback

    if history['status'] == 'cancelled':
        feedback = "Dear customer, your order of {} has already been cancelled.".format(
            his_id)
        return None, feedback

    if not match_email(his_id, email):
        feedback = "Dear customer, your email is not matched. Please check it again."
        return his_id, feedback

    if not match_vcode(his_id, vcode):
        feedback = "Dear customer, your vcode is not matched. Please check it again."
        return his_id, feedback

    today = date.today()
    check_out = (
        date.fromtimestamp(int(history['check_in_time'])) - today).days
    if check_out <= 1:
        feedback = "Sorry. Your order can only be cancelled one day before checking in."
        return his_id, feedback

    acco_id = history['acco_id']
    if not update_available(acco_id, history['check_in_time'],
                            history['check_out_time'], '1'):
        feedback = "Dear customer, your order of {} is not found. Please check if it has been cancelled.".format(
            his_id)
        return his_id, feedback

    delete_history(his_id)
    feedback = "Dear customer, your order of {} has been cancelled.".format(
        his_id)
    return his_id, feedback


def cancel_booking_by_userid(his_id, user_id):
    history = db.reference('history').child(his_id).get()

    if not history:
        feedback = "Dear customer, your order of {} is not found.".format(
            his_id)
        return None, feedback

    if history['status'] == 'cancelled':
        feedback = "Dear customer, your order of {} has already been cancelled.".format(
            his_id)
        return None, feedback

    if not match_user(his_id, user_id):
        feedback = "No such user"
        return his_id, feedback

    today = date.today()
    check_out = (
        date.fromtimestamp(int(history['check_in_time'])) - today).days
    if check_out <= 1:
        feedback = "Sorry. Your order can only be cancelled one day before checking in."
        return his_id, feedback

    acco_id = history['acco_id']
    if not update_available(acco_id, history['check_in_time'],
                            history['check_out_time'], '1'):
        feedback = "Dear customer, your order of {} is not found. Please check if it has been cancelled.".format(
            his_id)
        return his_id, feedback

    delete_history(his_id)
    feedback = "Dear customer, your order of {} has been cancelled.".format(
        his_id)
    return his_id, feedback


def reschedule(his_id, user_id, check_in_time, check_out_time):
    #print(his_id)
    history = db.reference('history').child(his_id).get()

    if not history:
        feedback = "Dear customer, your order of {} is not found.".format(
            his_id)
        return None, None, feedback

    if history['status'] == 'cancelled':
        feedback = "Dear customer, your order of {} has already been cancelled.".format(
            his_id)
        return None, None, feedback

    if not match_user(his_id, user_id):
        feedback = "No such user"
        return his_id, None, feedback

    today = date.today()
    check_out = (
        date.fromtimestamp(int(history['check_in_time'])) - today).days
    if check_out <= 1:
        feedback = "Sorry. Your order can only be cancelled one day before checking in."
        return his_id, None, feedback

    acco_id = history['acco_id']
    if not update_available(acco_id, history['check_in_time'],
                            history['check_out_time'], '1'):
        feedback = "Dear customer, your order of {} is not found. Please check if it has been cancelled.".format(
            his_id)
        return his_id, None, feedback

    if update_available(acco_id, check_in_time, check_out_time, '0'):
        new_history = history
        new_history['check_in_time'] = check_in_time
        new_history['check_out_time'] = check_out_time
        new_history['timestamp'] = str(time.time()).split('.')[0]
        new_history['vcode'] = generate_vcode()
        db.reference('history').child(his_id).set(
            json.loads(json.dumps(new_history)))
        feedback = "Dear customer, your order {} has been successfully rescheduled. Please check in at {}. Your verification number is {}.".format(
            his_id, date.fromtimestamp(check_in_time), new_history['vcode'])
        return his_id, new_history['vcode'], feedback
    else:
        update_available(acco_id, history['check_in_time'],
                         history['check_out_time'], '0')
        feedback = "Dear customer, your reschedule failed. Please check other properties."
        return None, None, feedback


def password_correct(email, password):
    ref_e_p = db.reference("users").order_by_child("email").equal_to(
        email).get()
    print(ref_e_p)
    for e in ref_e_p:
        e_mail = ref_e_p[e]['email']
        #print("e_mail:", e_mail)
        pass_word = ref_e_p[e]['password']
        # print(e['password'])
        if email == e_mail:
            if password == pass_word:
                #print(":1")
                return "correct"
            else:
                #print(":0")
                return "password wrong"
    #print(":00")
    return "no such email"


def get_amenities():
    return list(db.reference('amenities').get())


def get_rules():
    return list(db.reference('rules').get())


def get_locations():
    return db.reference('postcode').get()


def get_amenities_and_suburb_list():
    result = {}
    amenities = db.reference('amenities').get()
    result['amenities'] = [{'name': a, 'id': a} for a in amenities]
    postcodes = db.reference('postcode').get()
    suburbs = set()
    for postcode in postcodes:
        for suburb in postcodes[postcode]:
            is_sydney = suburb == 'Sydney'
            is_admin = 'Administrative' in suburb
            is_eastern = suburb == "Eastern Suburbs Mc"
            if not (is_sydney or is_admin or is_eastern):
                suburbs.add(suburb)
    result['suburbs'] = [{'name': s, 'id': s} for s in suburbs]
    return result


def match_vcode(his_id, vcode):
    history = db.reference('history').child(his_id).get()
    if history:
        if history['vcode'].upper() == vcode.upper():
            return True
        else:
            return False
    return None


def match_email(his_id, email):
    history = db.reference('history').child(his_id).get()
    if history:
        if 'email' in history:
            return history['email'] == email
        else:
            return db.reference('users').child(
                history['user_id']).get()['email'] == email
    return None


def match_user(his_id, user_id):
    history = db.reference('history').child(his_id).get()
    if history:
        if 'user_id' in history:
            return history['user_id'] == user_id
    return None


def update_review(acco_id, user_id, rating, comment=None):
    if user_id_exist(user_id):
        # ref_r = db.reference("reviews").push()
        rev_id = str(time.time()).replace('.', '')
        ref_r = db.reference('reviews').child(rev_id)
        tmp = {}
        tmp['timestamp'] = str(time.time()).split('.')[0]
        tmp['acco_id'] = acco_id
        tmp['user_id'] = user_id
        tmp['rating'] = rating
        tmp['likes_num'] = "0"
        tmp['unlikes_num'] = "0"
        tmp['weight'] = "0"
        if comment != None:
            tmp['comment'] = comment
        ref_r.set(json.loads(json.dumps(tmp)))
        message = "Update complete"
        return message
    message = "No such user"
    return message


def update_review_without_login(acco_id, email, rating, comment=None):
    # ref_r = db.reference("reviews").push()
    rev_id = str(time.time()).replace('.', '')
    ref_r = db.reference('reviews').child(rev_id)
    tmp = {}
    tmp['timestamp'] = str(time.time()).split('.')[0]
    tmp['acco_id'] = acco_id
    tmp['email'] = email
    tmp['rating'] = rating
    tmp['likes_num'] = "0"
    tmp['unlikes_num'] = "0"
    tmp['weight'] = "0"
    if comment != None:
        tmp['comment'] = comment
    ref_r.set(json.loads(json.dumps(tmp)))
    message = "Update complete"
    return message


def delete_review(review_id):
    rev = db.reference("reviews").order_by_key().equal_to(review_id).get()
    if rev:
        db.reference("reviews/" + review_id).delete()
        message = "Delete review complete"
        return message
    else:
        message = "No such review"
        return message


def search_review(user_id=None, acco_id=None):
    if user_id == None and acco_id == None:
        return db.reference('reviews').get()

    if user_id == None:
        return db.reference('reviews').order_by_child('acco_id').equal_to(
            acco_id).get()

    if acco_id == None:
        return db.reference('reviews').order_by_child('user_id').equal_to(
            user_id).get()

    rev = db.reference('reviews').order_by_child('user_id').equal_to(
        user_id).get()
    return {x: rev[x] for x in rev if rev[x]['acco_id'] == acco_id}


def update_likes(review_id, user_id):
    rev = db.reference("reviews").child(review_id).get()
    if rev is None:
        message = "Update fail"
        return message
    try:
        if (user_id in rev["likes"]) or( user_id in rev["unlikes"]):
            message = "Update fail"
            # print(message)
            # return message
        else:
            #update likes number
            likes_num = str(int(rev["likes_num"]) + 1)
            json_num = json.loads(json.dumps({"likes_num": likes_num}))
            #update like users
            list_users = rev["likes"]
            list_users.append(user_id)
            json_users = json.loads(json.dumps({"likes": list_users}))
            db.reference("reviews").child(review_id).update(json_num)
            db.reference("reviews").child(review_id).update(json_users)
            #update weight
            unlikes_num = rev["unlikes_num"]
            weight = str((int(likes_num) - int(unlikes_num)) /
                         (int(likes_num) + int(unlikes_num)))
            json_weight = json.loads(json.dumps({"weight": weight}))
            db.reference("reviews").child(review_id).update(json_weight)
            message = "Update complete"
            # return message
    except KeyError:
        # print("1")
        #update likes number
        likes_num = str(int(rev["likes_num"]) + 1)
        # print(likes_num)
        json_num = json.loads(json.dumps({"likes_num": likes_num}))
        #update like users
        list_users = []
        list_users.append(user_id)
        json_users = json.loads(json.dumps({"likes": list_users}))
        db.reference("reviews").child(review_id).update(json_num)
        db.reference("reviews").child(review_id).update(json_users)
        #update weight
        unlikes_num = rev["unlikes_num"]
        weight = str((int(likes_num) - int(unlikes_num)) /
                     (int(likes_num) + int(unlikes_num)))
        json_weight = json.loads(json.dumps({"weight": weight}))
        db.reference("reviews").child(review_id).update(json_weight)
        message = "Update complete"
        # return message
    return message


def update_unlikes(review_id, user_id):
    rev = db.reference("reviews").child(review_id).get()
    if rev is None:
        message = "Update fail"
        return message
    try:
        if (user_id in rev["likes"]) or (user_id in rev["unlikes"]):
            message = "Update fail"
            # print(message)
            # return message
        else:
            #update unlikes number
            unlikes_num = str(int(rev["unlikes_num"]) + 1)
            json_num = json.loads(json.dumps({"unlikes_num": unlikes_num}))
            #update unlikes users
            list_users = rev["unlikes"]
            list_users.append(user_id)
            json_users = json.loads(json.dumps({"unlikes": list_users}))
            db.reference("reviews").child(review_id).update(json_num)
            db.reference("reviews").child(review_id).update(json_users)
            #update weight
            likes_num = rev["likes_num"]
            if (int(likes_num) + int(unlikes_num)):
                weight = str((int(likes_num) - int(unlikes_num)) /
                             (int(likes_num) + int(unlikes_num)))
            else:
                weight = 0
            json_weight = json.loads(json.dumps({"weight": weight}))
            db.reference("reviews").child(review_id).update(json_weight)
            message = "Update complete"
    except KeyError:
        #update likes number
        unlikes_num = str(int(rev["unlikes_num"]) + 1)
        json_num = json.loads(json.dumps({"unlikes_num": unlikes_num}))
        #update like users
        list_users = []
        list_users.append(user_id)
        json_users = json.loads(json.dumps({"unlikes": list_users}))
        db.reference("reviews").child(review_id).update(json_num)
        db.reference("reviews").child(review_id).update(json_users)
        #update weight
        likes_num = rev["likes_num"]
        if (int(likes_num) + int(unlikes_num)):
            weight = str((int(likes_num) - int(unlikes_num)) /
                         (int(likes_num) + int(unlikes_num)))
        else:
            weight = 0
        json_weight = json.loads(json.dumps({"weight": weight}))
        db.reference("reviews").child(review_id).update(json_weight)
        message = "Update complete"
        # return message
    return message


def delete_likes(review_id, user_id):
    rev = db.reference("reviews").child(review_id).get()
    if rev is None:
        message = "Delete fail"
        return message
    try:
        if user_id not in rev["likes"]:
            message = "Delete fail"
            # print(message)
            # return message
        else:
            #delete likes number
            likes_num = str(int(rev["likes_num"]) - 1)
            json_num = json.loads(json.dumps({"likes_num": likes_num}))
            #remove likes user
            list_users = rev["likes"]
            list_users.remove(user_id)
            json_users = json.loads(json.dumps({"likes": list_users}))
            db.reference("reviews").child(review_id).update(json_num)
            db.reference("reviews").child(review_id).update(json_users)
            #update weight
            unlikes_num = rev["unlikes_num"]
            if (int(likes_num) + int(unlikes_num)):
                weight = str((int(likes_num) - int(unlikes_num)) /
                             (int(likes_num) + int(unlikes_num)))
            else:
                weight = 0
            json_weight = json.loads(json.dumps({"weight": weight}))
            db.reference("reviews").child(review_id).update(json_weight)
            message = "Delete complete"
    except KeyError:
        message = "Delete fail"
    return message


def delete_unlikes(review_id, user_id):
    rev = db.reference("reviews").child(review_id).get()
    if rev is None:
        message = "Delete fail"
        return message
    try:
        if user_id not in rev["unlikes"]:
            message = "Delete fail"
            # print(message)
            # return message
        else:
            #delete unlikes number
            unlikes_num = str(int(rev["unlikes_num"]) - 1)
            json_num = json.loads(json.dumps({"unlikes_num": unlikes_num}))
            #remove unlikes user
            list_users = rev["unlikes"]
            list_users.remove(user_id)
            json_users = json.loads(json.dumps({"unlikes": list_users}))
            db.reference("reviews").child(review_id).update(json_num)
            db.reference("reviews").child(review_id).update(json_users)
            #update weight
            likes_num = rev["likes_num"]
            if (int(likes_num) + int(unlikes_num)):
                weight = str((int(likes_num) - int(unlikes_num)) /
                             (int(likes_num) + int(unlikes_num)))
            else:
                weight = 0
            json_weight = json.loads(json.dumps({"weight": weight}))
            db.reference("reviews").child(review_id).update(json_weight)
            message = "Delete complete"
    except KeyError:
        message = "Delete fail"
    return message

def recommand(userid, browse_history):
    if browse_history == None:
        browse_history = {'history': []}
    accos = db.reference('accommodations').get()

    uid_l = list(db.reference('users').get().keys())
    acco_l = list(accos.keys())
    his_l = db.reference('history').get()
    his_l = [(x['user_id'], x['acco_id']) for x in his_l.values()
             if 'email' not in x]

    tmp_his = [y for (x, y) in his_l if x == userid]

    c = {uid: {} for uid in uid_l}

    for uid in uid_l:
        for acco in acco_l:
            if (uid, acco) in his_l:
                c[uid][acco] = 1
            else:
                c[uid][acco] = 0
    print(type(browse_history))
    if browse_history['history'] != []:

        for acco_id in browse_history['history']:
            if acco_id not in c[userid]:
                c[userid][acco_id] = 1

    dis = {
        uid: sim(list(c[userid].values()), list(c[uid].values()))
        for uid in c
    }
    dis = sorted(dis.items(), key=lambda item: item[1])
    del (dis[dis == [(a, b) for (a, b) in dis if a == userid][0]])

    data = {}
    for (uid, _) in dis[:10]:
        tmp_l = [y for (x, y) in his_l if x == uid]
        if browse_history != []:
            for acco_id in browse_history['history']:
                if acco_id in tmp_l:
                    tmp_l.remove(acco_id)
        for acco_id in tmp_his:
            if acco_id in tmp_l:
               tmp_l.remove(acco_id)
        for acco_id in tmp_l:
            data[acco_id] = accos[acco_id]
            if len(data) >= 5:
                break

    tmp_accos = {}
    for acco_id in accos:
        if accos[acco_id]['rank']['total'] == 0:
            tmp_accos[acco_id] = 0
        else:
            tmp_accos[
                acco_id] = accos[acco_id]['rank']['score'] / accos[acco_id]['rank']['total']

    if browse_history['history'] != []:
        for acco_id in browse_history['history']:
            if acco_id in tmp_accos:
                del (tmp_accos[acco_id])
    for acco_id in tmp_his:
        if acco_id in tmp_accos:
            del (tmp_accos[acco_id])
    for acco_id in data:
        if acco_id in tmp_accos:
            del (tmp_accos[acco_id])
    tmp_accos = sorted(
        tmp_accos.items(), key=lambda item: item[1], reverse=True)
    for (acco_id, _) in tmp_accos[:(5 - len(data))]:
        data[acco_id] = accos[acco_id]
    result = {}
    result['number'] = len(data)
    result['data'] = data
    return result


def sim(user_a, user_b):
    result = 0
    for i in range(len(user_a)):
        result += (user_a[i] - user_b[i])**2
    return result




cred = credentials.Certificate('/Users/wyj/Desktop/flaskf/kriswuskr-9900-firebase-adminsdk.json')
# Initialize the app with a service account, granting admin privileges
firebase_admin.initialize_app(
    cred, {'databaseURL': 'https://kriswuskr-9900.firebaseio.com'})
# print(user_exist("aaaaa"))
# print(email_exist("a@b.com"))
