# Afourathon Hackathon
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.exc import IntegrityError
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
from flask_cors import CORS
import pandas as pd
import os

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

UPLOAD_FOLDER = os.getcwd()+'/static'

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['SECRET_KEY'] = '8BYkEfBA6O6donzWlSihBXox7C0sKR6b'
app.config["JWT_SECRET_KEY"] = "lets-keep-it-hello" 
jwt = JWTManager(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///library.db'  # SQLite database file
db = SQLAlchemy(app)

CORS(app)

class Admin(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True)
    userType = db.Column(db.String(50), default="admin")
    password = db.Column(db.String(100))

class Student(db.Model):
    id = db.Column(db.String(100), primary_key=True)
    name = db.Column(db.String(100), default="ABC")
    email = db.Column(db.String(100))
    number = db.Column(db.String(20), default="0")
    userType = db.Column(db.String(50), default="student")

with app.app_context():
    db.create_all()
    # num_rows_deleted = db.session.query(Admin).delete()
    # num_rows_deleted_two = db.session.query(Student).delete()
    # db.session.commit()
    # print(num_rows_deleted_two, " Deleted")

@app.route('/')
def hello_world():
    return 'Hello World', 200

# ADMIN
@app.route('/register', methods=['POST'])
def create_user():
    data = request.get_json()
    # name, email, number, userType = data['name'], data['email'], data['number'], data['userType']
    email = data['email']
    exists = db.session.query(db.exists().where(Admin.email == data['email'])).scalar()
    print(email, " : ", exists)

    # TODO: Check whether email contains in College Teachers/Admin Library

    hash_and_salted_password = generate_password_hash(
            data['password'],
            method='pbkdf2:sha256',
            salt_length=8
        )

    if(not exists):
        # new_user = User(name=name, email=email, number=number, userType=userType, password=hash_and_salted_password)
        new_user = Admin(email=data['email'], password=hash_and_salted_password)
        db.session.add(new_user)
        db.session.commit()

        return jsonify({'message': 'Admin created successfully'}), 200
    else:
        return {'message':'Email already exists'}, 401


@app.route('/login', methods=['POST'])
def login_user():
    data = request.get_json()
    # name, email, number, userType = data['name'], data['email'], data['number'], data['userType']
    email = data['email']
    exists = db.session.query(db.exists().where(Admin.email == data['email'])).scalar()
    print(email, " : ", exists)

    user = Admin.query.filter_by(email=email).first()
    # print(user)

    if not user:
        return jsonify({'message': 'User does not exist, Register now'}), 404

    if check_password_hash(user.password, data['password']):
        access_token = create_access_token(identity=email)
        return jsonify(access_token=access_token), 200
    else:
        allow = check_password_hash(user.password, data['password'])
        response = {'message': 'Wrong Credentials, check Password/Email', 'email': email, 'allow': allow}
        return jsonify(response), 401
    

@app.route('/getAdmins')
@jwt_required()
def get_admins():
    current_user = get_jwt_identity()
    users = Admin.query.all()
    user_list = []
    for user in users:
        user_data = {
            'id': user.id,
            'email': user.email,
            'userType': user.userType,
            'password': user.password
        }
        user_list.append(user_data)

    return jsonify(user_list), 200

# STUDENT
@app.route('/registerStudent', methods=['POST'])
@jwt_required()
def create_student():
    data = request.get_json()
    id = data['id']
    exists = db.session.query(db.exists().where(Student.id == data['id'])).scalar()
    print(id, " : ", exists)

    if(not exists):
        new_user = Student(id=data['id'], name=data['name'], email=data['email'], number=data['number'])
        db.session.add(new_user)
        db.session.commit()

        return jsonify({'message': 'Student created successfully'}), 200
    else:
        return {'message':f'Student with ID {id} already exists'}, 401


@app.route('/registerBulk', methods=['POST'])
@jwt_required()
def create_students():
    data = request.files['file']
    name = secure_filename(data.filename)

    if data:
        data_loc = os.path.join(app.config['UPLOAD_FOLDER'], name)
        data.save(data_loc)
        print("File Location: ", data_loc)
    else:
        return jsonify({'message':'File Not Received'}), 404

    df = pd.read_excel(data_loc)
    # print(df.head())

    messages = []
    for index, row in df.iterrows():
        # print(row["id"], row["name"], row["email"])
        id = row['id']
        exists = db.session.query(db.exists().where(Student.id == row['id'])).scalar()
        print(id, " : ", exists)

        if(not exists):
            new_user = Student(id=row['id'], name=row['name'], email=row['email'], number=row['number'])
            db.session.add(new_user)
            db.session.commit()

            messages.append({'id':row['id'], 'message': 'Student created successfully'})
        else:
            messages.append({'id':row['id'], 'message':f'Student with ID {id} already exists'})
    return jsonify({'message': 'Students Registered Succesffuly', 'status':messages}), 200


@app.route('/getStudents')
@jwt_required()
def get_students():
    users = Student.query.all()
    user_list = []
    for user in users:
        user_data = {
            'id': user.id,
            'name': user.name,
            'email': user.email,
            'number': user.number,
            'userType': user.userType,
        }
        user_list.append(user_data)

    return jsonify(user_list), 200


@app.route('/student/<int:user_id>', methods=['PUT'])
@jwt_required()
def edit_user(user_id):
    user = Student.query.get(user_id)

    if not user:
        return jsonify({'message': 'User not found'}), 404

    data = request.get_json()

    id = data['id']
    exists = db.session.query(db.exists().where(Student.id == data['id'])).scalar()
    print(id, " : ", exists)

    if(not exists):
        if 'id' in data:
            user.id = data['id']
        if 'name' in data:
            user.name = data['name']
        if 'email' in data:
            user.email = data['email']
        if 'number' in data:
            user.number = data['number']

        db.session.commit()

        return jsonify({'message': 'Student updated successfully'}), 200
    else:
        return jsonify({'message': 'Student with ID already exists'}), 401

@app.route('/student/delete/<int:user_id>', methods=['PUT'])
@jwt_required()
def delete_user(user_id):
    user = Student.query.get(user_id)

    if not user:
        return jsonify({'message': 'User not found'}), 404

    try:
        db.session.delete(user)
        db.session.commit()
        return jsonify({'message': 'Student deleted successfully'}), 200
    except Exception as e:
        return jsonify({'message': 'Unable to Delete Student'}), 401

if __name__ == '__main__':
    # db.create_all()
    app.run(debug=True)
