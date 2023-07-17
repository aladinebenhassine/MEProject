# app.py
from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'your-secret-key'  # Replace with a secure secret key
jwt = JWTManager(app)

# In-memory database (for demonstration purposes)
users = []

@app.route('/register', methods=['POST'])
def register():
    email = request.json.get('email')
    password = request.json.get('password')

    # Check if the email is already registered
    if any(user['email'] == email for user in users):
        return jsonify({'message': 'Email already registered'}), 400

    # Generate a hashed password
    hashed_password = generate_password_hash(password)

    # Create a new user object
    user = {
        'email': email,
        'password': hashed_password
    }

    # Add the user to the in-memory database
    users.append(user)

    return jsonify({'message': 'User registered successfully'}), 201

@app.route('/login', methods=['POST'])
def login():
    email = request.json.get('email')
    password = request.json.get('password')

    # Find the user in the in-memory database
    user = next((user for user in users if user['email'] == email), None)

    if user and check_password_hash(user['password'], password):
        # Password is correct, generate and return a JWT
        access_token = create_access_token(identity=email)
        return jsonify({'access_token': access_token}), 200
    else:
        return jsonify({'message': 'Invalid email or password'}), 401

@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify({'message': f'Hello, {current_user}! You accessed a protected route.'}), 200

if __name__ == '__main__':
    app.run()
