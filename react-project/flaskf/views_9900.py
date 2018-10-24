from flask import Flask, jsonify, request, session, redirect, url_for
from flask_restplus import reqparse
from flask_cors import *
from flask_mail import Mail, Message

import re
import json
from datetime import date
import time

import os, sys
sys.path.append(os.path.realpath('.'))
import db_9900 as db

app = Flask(__name__)
CORS(app, supports_credentials=True)





@app.route('/update_review', methods=['GET'])
def update_review():
    args = request.args
    acco_id = args.get('acco_id')
    print(acco_id)
    user_id = args.get('user_id')
    rating = args.get('rating')
    comment = args.get('comment')
    return db.update_review(acco_id, user_id, rating, comment)

@app.route('/update_review_without_login', methods=['GET'])
def update_review_without_login():
    args = request.args
    acco_id = args.get('acco_id')
    print(acco_id)
    email = args.get('email')
    rating = args.get('rating')
    comment = args.get('comment')
    return db.update_review(acco_id, email, rating, comment)


@app.route('/search', methods=['GET'])
def search_1():
    args = request.args
    location = args.get('location')
    check_in_time = args.get('check_in_time')
    check_out_time = args.get('check_out_time')
    guest_num = args.get('guest_num')
    return jsonify(
        db.search(location, check_in_time, check_out_time, guest_num))


@app.route('/filter_search', methods=['GET'])
def filter_search():
    args = request.args
    location = args.get('location')
    check_in_time = args.get('check_in_time')
    check_out_time = args.get('check_out_time')
    guest_num = args.get('guest_num')
    amenities = args.get('amenities')
    rules = args.get('rules')
    upper_price = args.get('upper_price')
    lower_price = args.get('lower_price')
    return jsonify(
        db.search(location, check_in_time, check_out_time, guest_num,
                  amenities, rules, upper_price, lower_price))


@app.route('/search_all', methods=['GET'])
def search_all():
    return jsonify(db.search_all())


# book an accommodation
@app.route('/booking', methods=['POST'])
def booking(option=""):
    acco_id = request.form['acco_id']
    check_in_time = request.form['check_in_time']
    check_out_time = request.form['check_out_time']
    message = request.form['message']

    if option == 'byemail':
        user_id = request.form['user_id']
        email = request.form['email']
        name = request.form['name']
        contact = request.form['contact']
        order_id, vcode = db.booking_without_login(name, email, contact, acco_id, check_in_time, check_out_time, message, user_id=user_id)
        return
    else:
        user_id = request.form['user_id']
        return db.booking(user_id, acco_id, check_in_time, check_out_time, message)

@app.route('/login', methods=['POST'])
def login():
    email = request.form['email']
    password = request.form['password']
    if db.password_correct(email, password) == "correct":
        session['user'] = request.form['email']
        print("login success")
        return "login success"
    elif db.password_correct(email, password) == "password wrong":
        print("password wrong")
        return "password wrong"
    elif db.password_correct(email, password) == "no such email":
        print("no such email")
        return "no such email"
    else:
        return "failed"


@app.route('/logout', methods=['GET'])
def logout():
    session.pop('user', None)
    return redirect(url_for('/'))


@app.route('/register', methods=['POST'])
def register():
    username = request.form['username']
    password = request.form['password']
    email = request.form['email']
    phone = request.form['phone']
    if db.insert_user(username, password, email, phone):
        return 'success'
    else:
        return 'failed'




if __name__ == '__main__':
    app.run()
