from werkzeug.security import generate_password_hash
from werkzeug.security import check_password_hash
from flask_login import UserMixin

from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, PasswordField
from wtforms.validators import DataRequired

import db_9900

# 定义的表单都需要继承自FlaskForm
class LoginForm(FlaskForm):
    # 域初始化时，第一个参数是设置label属性的
    username = StringField('User Name', validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired()])
    remember_me = BooleanField('remember me', default=False)


class User(UserMixin):
    def __init__(self, username):
        self.username = username
        self.id = self.get_id()

    @property
    def password(self):
        raise AttributeError('password is not a readable attribute')

    def verify_password(self, password):
        password_hash = self.get_password_hash()
        if password_hash is None:
            return False
        return check_password_hash(self.password_hash, password)

    def get_password_hash(self):
        # """try to get password hash from database.

        # :return password_hash: if the there is corresponding user in
        #         the file, return password hash.
        #         None: if there is no corresponding user, return None.
        # """
        return db_9900.search_user(self.username)

    #regist--
    # def get_id(self):
    #     # """get user id from profile file, if not exist, it will
    #     # generate a uuid for the user.
    #     # """
    #     if self.username is not None:
    #         try:
    #             with open(PROFILE_FILE) as f:
    #                 user_profiles = json.load(f)
    #                 if self.username in user_profiles:
    #                     return user_profiles[self.username][1]
    #         except IOError:
    #             pass
    #         except ValueError:
    #             pass
    #     return unicode(uuid.uuid4())

    @staticmethod
    def get(user_id):
        pass
        # """try to return user_id corresponding User object.
        # This method is used by load_user callback function
        # """

        # if not user_id:
        #     return None
        # try:
        #     with open(PROFILE_FILE) as f:
        #         user_profiles = json.load(f)
        #         for user_name, profile in user_profiles.iteritems():
        #             if profile[1] == user_id:
        #                 return User(user_name)
        # except:
        #     return None
        # return None

