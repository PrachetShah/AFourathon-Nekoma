# Afourathon Hackathon
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.exc import IntegrityError

app = Flask(__name__)
app.config['SECRET_KEY'] = '8BYkEfBA6O6donzWlSihBXox7C0sKR6b'

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///library.db'  # SQLite database file
db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(100))
    number = db.Column(db.String(20))
    userType = db.Column(db.String(50))

with app.app_context():
    db.create_all()
    # num_rows_deleted = db.session.query(User).delete()
    # db.session.commit()
    # print(num_rows_deleted, " Deleted")

@app.route('/')
def hello_world():
    return 'Hello World'

@app.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    name, email, number, userType = data['name'], data['email'], data['number'], data['userType']

    exists = db.session.query(db.exists().where(User.email == data['email'])).scalar()
    print(email, " : ", exists)

    if(not exists):
        new_user = User(name=name, email=email, number=number, userType=userType)
        db.session.add(new_user)
        db.session.commit()

        return jsonify({'message': 'User created successfully'})
    else:
        return {'message':'Email already exists'}

@app.route('/getUsers')
def get_users():
    users = User.query.all()
    user_list = []
    for user in users:
        user_data = {
            'id': user.id,
            'name': user.name,
            'email': user.email,
            'number': user.number,
            'userType': user.userType
        }
        user_list.append(user_data)

    return jsonify(user_list)


@app.route('/users/<int:user_id>', methods=['PUT'])
def edit_user(user_id):
    user = User.query.get(user_id)

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
    if 'userType' in data:
        user.userType = data['userType']

    db.session.commit()

    return jsonify({'message': 'User updated successfully'})


if __name__ == '__main__':
    # db.create_all()
    app.run(debug=True)
