from flask import Flask, jsonify, request, session, redirect, url_for
from flask_session import Session
from flask_restplus import reqparse
from flask_cors import *
from flask_mail import Mail, Message
from flask_script import Manager
from itsdangerous import (TimedJSONWebSignatureSerializer as Serializer)
from functools import wraps

import re
import json
from datetime import date
import time


import os, sys
sys.path.append(os.path.realpath('.'))
import db_9900 as db

app = Flask(__name__)
CORS(app, supports_credentials=True)



app.config.update(dict(
    DEBUG = True,
    MAIL_SERVER = 'smtp.gmail.com',
    MAIL_PORT = 465,
    MAIL_USE_SSL = True,
    MAIL_USERNAME = 'gobookingya',
    MAIL_PASSWORD = 'Woshinibaba',
    MAIL_DEFAULT_SENDER = 'GO BOOKING <gobookingya@gmail.com>'
))




manager = Manager(app)

mail = Mail(app)

def sending_email(email,message):
    msg = Message("Non-reply", recipients=[email])
    msg.body = message
    mail.send(msg)
    return "aaa"

SECRET_KEY = "A RANDOM KEY"


def authenticate_by_token(token):
    if token is None:
        return False
    s = Serializer(SECRET_KEY)
    try:
        username = s.loads(token.encode())
        if username == session.get['username']:
            return True
    except:
        return False

    return False
def authenticate_by_token_guestoradmin(token):

    if token is None:

        return False
    s = Serializer(SECRET_KEY)

    try:
        token1 = token.split('Token')[0]
        token2 = token.split('Token')[1]
        username = s.loads(token1.encode())
        password = s.loads(token2.encode())
        print(username)
        if db.password_correct(username, password) == "correct":
            return True
    except:
        return False

    return False
def login_required_guestoradmin(f, message="You are not authorized"):
    @wraps(f)
    def decorated_function_a(*args, **kwargs):
        token = request.headers.get("AUTH_TOKEN")

        if authenticate_by_token_guestoradmin(token):
            return f(*args, **kwargs)

        return jsonify(message=message), 401
      # abort(401, message=message)

    return decorated_function_a

def login_required_admin(f, message="You are not authorized"):
    @wraps(f)
    def decorated_function(*args, **kwargs):

        token = request.headers.get("AUTH_TOKEN")

        if authenticate_by_token(token):
            return f(*args, **kwargs)

        return jsonify(message=message), 401
        # abort(401, message=message)

    return decorated_function


@app.route("/auth", methods=['POST'])
def generate_token():
        parser = reqparse.RequestParser()
        parser.add_argument('username', type=str)
        parser.add_argument('password', type=str)
        args = parser.parse_args()
        username = args.get('username')

        password = args.get('password')
        print(username)
        s = Serializer(SECRET_KEY, expires_in=1000)
        token1 = s.dumps(username)
        token2 = s.dumps(password)
        print(password)
        if db.password_correct(username, password) == "correct":


            res = db.search_user(username)
            response = jsonify({'token': token1.decode()+'Token'+token2.decode() ,'message' :res})
            # response.headers._list.append(('Access-Control-Allow-Origin', '*'))
            print(res)
            return response, 200
        elif db.password_correct(username, password) == "password wrong":
            print('222')
            return jsonify('incorrect password!')
        elif db.password_correct(username, password) == "no such email":
            print('333')
            return jsonify("no such email")
        else:
            print('ddd')
            return jsonify('incorrect password!')
@app.route('/check_login', methods=['GET'])
@login_required_guestoradmin
def check_login():


    return jsonify('Already Login')

@app.route('/fizzy_search', methods=['GET'])
def fizzy_search():
    args = request.args
    location = args.get('location')
    return jsonify(db.match_location(location))

@app.route('/recommend', methods=['POST'])
def recommed():
    args = request.args

    user_id = args.get('user_id')
    data = request.get_data()

    jdata = json.loads(data)
    print(jdata['history'])
    # return jsonify(db.search_all()['data']['000000002'])
    return jsonify(db.recommand(user_id,jdata))
@app.route('/search', methods=['POST'])
def search_1():
    data = request.get_data()

    jdata = json.loads(data)

    a = db.search(jdata)
    print(a)
    return jsonify(
            a)


@app.route('/filter_search', methods=['POST'])
def filter_search():
    data = request.get_data()
    jdata = json.loads(data)
    print(jdata)
    a = db.search(jdata)
    print(a)
    return jsonify(
        a)



@app.route('/search_all', methods=['GET'])
def search_all():
    return jsonify(db.search_all())


# book an accommodation
@app.route('/booking', methods=['POST'])
@login_required_guestoradmin
def booking():
    args = request.args
    email = args.get('email')
    acco_id = args.get('acco_id')
    user_id = args.get('user_id')
    message = args.get('message')
    check_in_time = int(args.get('check_in_time'))
    check_out_time = int(args.get('check_out_time'))
    order_id, vcode, result = db.booking(user_id, acco_id, check_in_time,
                                             check_out_time, message)

    return jsonify(result)


@app.route('/history', methods=['GET'])
def get_history():
    args = request.args
    email = args.get('email')
    vcode = args.get('vcode')
    order_num = args.get('order_num')
    history, message = db.get_history(order_num,email,vcode)
    return jsonify({'history':history,'message':message})

@app.route('/cancel_order', methods=['POST'])
def cancel_history():
    args = request.args
    email = args.get('email')
    vcode = args.get('vcode')
    order_num = args.get('order_num')
    history, message = db.cancel_booking(order_num,email,vcode)
    return jsonify({'history':history,'message':message})
@app.route('/cancel_order_login', methods=['POST'])
@login_required_guestoradmin
def cancel_order_by_userid():
    args = request.args
    user_id = args.get('user_id')
    order_num = args.get('order_id')
    history, message = db.cancel_booking_by_userid(order_num, user_id)
    return jsonify(message)





@app.route('/booking_without_login', methods=['POST'])
def booking_without_login():
    args = request.args
    email = args.get('email')
    phone =  args.get('phone')
    username =  args.get('username')
    message = args.get('message')
    acc_id = args.get('id')
    check_in_time =int(args.get('check_in_time'))
    check_out_time=int(args.get('check_out_time'))
    order_id, vcode, message = db.booking_without_login(username,
                          email,
                                                phone,
                                                     acc_id,
                          check_in_time,
                          check_out_time,
                          message,
                          )

    sending_email(email,message)
    return jsonify(message)

@app.route('/register', methods=['POST'])
def register():
    args = request.args
    username = args.get('username')
    print(username)
    password = args.get('password')
    print(password)
    email = args.get('email')
    print(email)
    phone = args.get('phone')
    print(phone)
    if db.insert_user(username, password, email, phone):
        sending_email(email, 'Thanks for being our VIP')
        return jsonify('Success')

    return jsonify('failed')



@app.route('/update_review', methods=['GET'])
@login_required_guestoradmin
def update_review():
    args = request.args
    acco_id = args.get('acco_id')
    print(acco_id)
    user_id = args.get('user_id')
    rating = args.get('rating')
    comment = args.get('comment')
    message = db.update_review(acco_id, user_id, rating, comment)
    return jsonify(message)
@app.route('/update_likes', methods=['POST'])
@login_required_guestoradmin
def update_likes():
    args = request.args
    review_id = args.get('review_id')
    user_id = args.get('user_id')
    message = db.update_likes(review_id, user_id)
    return jsonify(message)

@app.route('/delete_likes', methods=['POST'])
@login_required_guestoradmin
def delete_likes():
    # print("1")
    args = request.args
    review_id = args.get('review_id')
    user_id = args.get('user_id')
    message = db.delete_likes(review_id, user_id)
    return jsonify(message)

@app.route('/update_unlikes', methods=['POST'])
@login_required_guestoradmin
def update_unlikes():
    args = request.args
    review_id = args.get('review_id')
    user_id = args.get('user_id')
    message = db.update_unlikes(review_id, user_id)
    return jsonify(message)

@app.route('/delete_unlikes', methods=['POST'])
@login_required_guestoradmin
def delete_unlikes():
    args = request.args
    review_id = args.get('review_id')
    user_id = args.get('user_id')
    message = db.delete_unlikes(review_id, user_id)
    return jsonify(message)
@app.route('/update_review_without_login', methods=['GET'])
def update_review_without_login():
    args = request.args
    acco_id = args.get('acco_id')
    print(acco_id)
    email = args.get('email')
    rating = args.get('rating')
    comment = args.get('comment')
    message = db.update_review_without_login(acco_id, email, rating, comment)
    return jsonify(message)

@app.route('/search_order', methods=['GET'])
@login_required_guestoradmin
def search_order():
    args = request.args
    user_id = args.get('user_id')
    orders = db.search_history(user_id)
    result = []
    for e in orders:
        tmp = {}
        tmp['his_id'] = e
        # tmp['acco_id'] = orders[e]['acco_id']
        # tmp['check_in_time'] = orders[e]['check_in_time']
        # tmp['check_out_time'] = orders[e]['check_out_time']
        # # tmp['contact'] = orders[e]['contact']
        # tmp['name'] = orders[e]['name']
        # tmp['timestamp'] = orders[e]['timestamp']
        # tmp['user_id'] = orders[e]['user_id']
        # tmp['vcode'] = orders[e]['vcode']
        # tmp['message'] = orders[e]['message']
        tmp_1 = orders[e]
        #print("tmp_1: ", tmp_1)
        for e_1 in tmp_1:
            tmp[e_1] = tmp_1[e_1]
        #print("tmp: ", tmp)
        result.append(tmp)
    # print(orders)
    # print(result)

    return jsonify(result), 200


@app.route('/change_time', methods=['POST'])
def change_time():
    args = request.args
    user_id = args.get('user_id')
    order_id = args.get('order_id')
    #print("oder_id: ", order_id)
    check_in_time = int(args.get('check_in_time'))
    check_out_time = int(args.get('check_out_time'))
    his_id, vcode, msg = db.reschedule(order_id, user_id, check_in_time, check_out_time)
    return jsonify( msg)

if __name__ == '__main__':


    app.run()

