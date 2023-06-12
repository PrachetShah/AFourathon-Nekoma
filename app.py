# Afourathon Hackathon
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.exc import IntegrityError
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.config['SECRET_KEY'] = '8BYkEfBA6O6donzWlSihBXox7C0sKR6b'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///library.db'  # SQLite database file
db = SQLAlchemy(app)

class Admin(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100))
    userType = db.Column(db.String(50), default="admin")
    password = db.Column(db.String(100))

class Student(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), default="ABC")
    email = db.Column(db.String(100))
    number = db.Column(db.String(20), default="0")
    userType = db.Column(db.String(50), default="student")

with app.app_context():
    db.create_all()
    # num_rows_deleted = db.session.query(Admin).delete()
    # num_rows_deleted_two = db.session.query(Student).delete()
    # db.session.commit()
    # print(num_rows_deleted, " Deleted")

@app.route('/')
def hello_world():
    return 'Hello World'

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

        return jsonify({'message': 'User created successfully'})
    else:
        return {'message':'Email already exists'}

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
        allow = check_password_hash(user.password, data['password'])
        response = {'message': 'Allow Access', 'email': email, 'allow': allow}
        return jsonify(response), 200
    else:
        allow = check_password_hash(user.password, data['password'])
        response = {'message': 'Wrong Credentials, check Password/Email', 'email': email, 'allow': allow}
        return jsonify(response), 401

    

@app.route('/getAdmins')
def get_users():
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

    return jsonify(user_list)

'''
@app.route('/registerStudents', methods=['POST'])
def create_student():
    data = request.get_json()
    # name, email, number, userType = data['name'], data['email'], data['number'], data['userType']
    email = data['email']
    exists = db.session.query(db.exists().where(User.email == data['email'])).scalar()
    print(email, " : ", exists)

    # TODO: Check whether email contains in College Teachers/Admin Library

    hash_and_salted_password = generate_password_hash(
            data['password'],
            method='pbkdf2:sha256',
            salt_length=8
        )

    if(not exists):
        # new_user = User(name=name, email=email, number=number, userType=userType, password=hash_and_salted_password)
        new_user = User(email=data['email'], password=hash_and_salted_password)
        db.session.add(new_user)
        db.session.commit()

        return jsonify({'message': 'User created successfully'})
    else:
        return {'message':'Email already exists'}
'''


'''
@app.route('/getStudents')
def get_users():
    users = Student.query.all()
    user_list = []
    for user in users:
        user_data = {
            'id': user.id,
            'name': user.name,
            'email': user.email,
            'number': user.number,
            'userType': user.userType,
            'password': user.password
        }
        user_list.append(user_data)

    return jsonify(user_list)
'''

@app.route('/users/<int:user_id>', methods=['PUT'])
def edit_user(user_id):
    user = Student.query.get(user_id)

    if not user:
        return jsonify({'message': 'User not found'})

    data = request.get_json()
    if 'id' in data:
        user.id = data['id']
    if 'name' in data:
        user.name = data['name']
    if 'email' in data:
        user.email = data['email']
    if 'number' in data:
        user.number = data['number']

    db.session.commit()

    return jsonify({'message': 'User updated successfully'})


if __name__ == '__main__':
    # db.create_all()
    app.run(debug=True)
