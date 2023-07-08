from app import app # Flask instance of the API
import json
import random
import string

def test_register_admin_known():
    mimetype = 'application/json'
    headers = {
        'Content-Type': mimetype,
    }
    data = {
        'email': 'testing@gmail.com',
        'password': 'testing',
    }
    response = app.test_client().post('/register', data=json.dumps(data), headers=headers)
    assert type(response.data.decode('utf-8')) == str 
    assert response.content_type == mimetype
    assert response.status_code == 401

def test_register_admin_unknown():
    mimetype = 'application/json'
    headers = {
        'Content-Type': mimetype,
    }
    res = ''.join(random.choices(string.ascii_lowercase, k=7))
    res2 = ''.join(random.choices(string.ascii_lowercase+string.ascii_uppercase+string.digits, k=9))
    data = {
        'email': f'{res}@gmail.com',
        'password': f'{res2}',
    }
    response = app.test_client().post('/register', data=json.dumps(data), headers=headers)
    assert response.content_type == mimetype
    assert response.status_code == 200

def test_get_all_admin():
    response = app.test_client().get('/getAdmins')
    assert response.status_code == 401