from flask import Flask, request, jsonify, Response
from flask_pymongo import PyMongo
from flask_cors import CORS
from bson import json_util, ObjectId
from flask_bcrypt import Bcrypt 
# JWT
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

app = Flask(__name__)
# Mongo
app.config['MONGO_URI'] = 'mongodb://localhost/todoappdb'
mongo = PyMongo(app)
db = mongo.db

# JWT
app.config["JWT_SECRET_KEY"] = "pXbXZ8MVyxi6agydav3i2v2&9-H5y/+=&GYw&A9ZZpBW%^H=R&6zkCK%hy=U1345pMZPmY2s5DpadaslBmdlcs5K4jkg8Kb" 
jwt = JWTManager(app)

CORS(app)
bcrypt = Bcrypt(app)

# Utils
default_board = {
    '_id': ObjectId(),
    'title': 'Get Started',
    'lists': [
        {
            '_id': ObjectId(),
            'title': 'To do',
            'notes': [
                {
                    '_id': ObjectId(),
                    'title': 'Welcome to To Do!',
                    'description': 'Here you can add tasks to be done.',
                }
            ]
        },
        {
            '_id': ObjectId(),
            'title': 'Doing',
            'notes': [
                {
                    '_id': ObjectId(),
                    'title': 'Welcome to Doing!',
                    'description': 'Here you can move tasks you are currently working on.',
                }
            ]
        },
        {
            '_id': ObjectId(),
            'title': 'Done',
            'notes': [
                {
                    '_id': ObjectId(),
                    'title': 'Welcome to Done!',
                    'description': 'Here you can move completed tasks.',
                }
            ]
        }
    ]
}

@app.route('/')
def index():
    return '<h1>Hello World</h1>'

@app.route('/api/token/verify', methods=['POST'])
@jwt_required()
def verify_token():
    current_user_id = get_jwt_identity()
    
    user = db.users.find_one({'_id': ObjectId(current_user_id)})
    
    if user:
        return jsonify({
            'valid': True,
            'user': {
                'username': user['username'],
            }
        }), 200
    else:
        return jsonify({'valid': False, 'message': 'User not found'}), 404

@app.route('/api/register', methods=['POST'])
def register_user():
    username = request.json['username']
    email = request.json['email']
    password = request.json['password']
    if username and email and password:
        user = {
            'username': username,
            'email': email,
            'password': bcrypt.generate_password_hash(password),
            'boards': [
                default_board
            ]
        }

        inserted_user = db.users.insert_one(user)
        user_id = str(inserted_user.inserted_id)
        acces_token = create_access_token(identity=user_id)
        return {"message": "User registered successfully", 'acces_token': acces_token}
    else:
        return {"error": "Missing fields"}, 401

@app.route('/api/login', methods=['POST'])
def login_user():
    email = request.json['email']
    password = request.json['password']

    if not email or not password:
        return jsonify({"error": "Missing fields"}), 400

    user = db.users.find_one({'email': email})

    if user and bcrypt.check_password_hash(user['password'], password):
        access_token = create_access_token(identity=str(user['_id']))
        return jsonify({"message": "Login successful", "access_token": access_token}), 200
    else:
        return jsonify({"error": "Invalid credentials"}), 401

@app.route('/api/board', methods=['POST'])
@jwt_required()
def create_board():
    current_user_id = get_jwt_identity()
    title = request.json['title']
    board = {
        '_id': ObjectId(),
        'title': title,
        'lists': [
            {
                '_id': ObjectId(),
                'title': 'To do',
                'notes': [
                    {
                        '_id': ObjectId(),
                        'title': 'Welcome to To Do!',
                        'description': 'Here you can add tasks to be done.',
                    }
                ]
            },
            {
                '_id': ObjectId(),
                'title': 'Doing',
                'notes': [
                    {
                        '_id': ObjectId(),
                        'title': 'Welcome to Doing!',
                        'description': 'Here you can move tasks you are currently working on.',
                    }
                ]
            },
            {
                '_id': ObjectId(),
                'title': 'Done',
                'notes': [
                    {
                        '_id': ObjectId(),
                        'title': 'Welcome to Done!',
                        'description': 'Here you can move completed tasks.',
                    }
                ]
            }
        ]
    }
    if current_user_id and title:
        db.users.update_one(
            {'_id': ObjectId(current_user_id)},
            {'$push' : {'boards' : board}}
        )
        return {"message": "Board created successfully"}, 200
    else:
        return {"error": "Missing fields"}, 401
    
@app.route('/api/<board_id>/list', methods=['POST'])
@jwt_required()
def create_list(board_id):
    current_user_id = get_jwt_identity()
    title = request.json['title']
    list = {
        '_id' : ObjectId(),
        'title' : title,
        'notes' : [
            {
                '_id' : ObjectId(),
                'title' : 'Title',
                'description' : 'Description'
            }
        ]
    }
    if title and current_user_id and board_id: 
        db.users.update_one(
            {
                '_id': ObjectId(current_user_id), 
                'boards._id': ObjectId(board_id)
            },
            {
                '$push': {
                    'boards.$[board].lists': list
                }
            },
            array_filters=[
                {'board._id': ObjectId(board_id)},
            ]
            
        )
        return {"message": "List created successfully"}, 200
    else:
        return {"error": "Missing fields"}, 401

@app.route('/api/<board_id>/<list_id>/note', methods=['POST'])
@jwt_required()
def create_note(board_id, list_id):
    current_user_id = get_jwt_identity()
    # title = request.json['title']
    note = {
        '_id' : ObjectId(),
        'title' : 'Title',
        'description' : 'Description'
    }
    if board_id and list_id and current_user_id:
        db.users.update_one(
            {
                '_id': ObjectId(current_user_id),
                'boards._id': ObjectId(board_id),
                'boards.lists._id': ObjectId(list_id)
            },
            {
                '$push': {
                    'boards.$[board].lists.$[list].notes': note
                }
            },
            array_filters=[
                {'board._id': ObjectId(board_id)},
                {'list._id': ObjectId(list_id)}
            ]
        )
        return {"message": "Note created successfully"}, 200
    else:
        return {"error": "Missing fields"}, 401


# Crear nota
@app.route('/note', methods=['POST'])
def add_note():
    title = request.json['title']
    description = request.json['description']
    type = request.json['type']
    if title and description:
        newNote = {
            'title': title, 
            'description' : description,
            'type' : type
        }
        note = db.notes.insert_one(newNote)
        added_note = db.notes.find_one({'_id': ObjectId(note.inserted_id)})
        added_note_json = json_util.dumps(added_note)
        return Response(added_note_json, mimetype='application/json')
    else:
        return {"Error":"Not added"}

# Obtener notas
@app.route('/note', methods=['GET'])
def get_notes():
    notes = db.notes.find()
    notes_json = json_util.dumps(notes)
    return Response(notes_json, mimetype='application/json')

# Obtener notas por tipo
@app.route('/note/<type>', methods=['GET'])
def get_note(type):
    note = db.notes.find({'type': type})
    note_json = json_util.dumps(note)
    return Response(note_json, mimetype='application/json')

# Eliminar nota
@app.route('/note/<id>', methods=['DELETE'])
def del_note(id):
    if db.notes.find_one({'_id' : ObjectId(id)}):
        db.notes.delete_one({'_id': ObjectId(id)})
        return {'Succes' : 'Note was deleted'}
    else:
        return {'Error': 'Note was not deleted'}

@app.route('/note/<id>', methods=['PUT'])
def edit_note(id):
    title = request.json['title']
    description = request.json['description']
    type = request.json['type']
    if title and description and type:
        db.notes.update_one(
            {'_id': ObjectId(id)}, 
            {'$set': {
                'title': title,
                'description' : description,
                'type' : type,
            }})
        note_json = json_util.dumps(db.notes.find_one({'_id': ObjectId(id)}))
        return Response(note_json, mimetype='application/json')


if __name__ == '__main__':
    app.run(debug=True)
