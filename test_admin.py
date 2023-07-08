from app import app # Flask instance of the API
import json

def test_register_admin():
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

def test_get_all_admin():
    response = app.test_client().get('/getAdmins')
    assert response.status_code == 401