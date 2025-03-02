# backend/app/routes/auth.py
from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from app.models.user import User
from app import db
from werkzeug.security import generate_password_hash, check_password_hash

auth_bp = Blueprint('auth', __name__)


@auth_bp.route('/register', methods=['POST'])
def register():
    """Register a new user."""
    data = request.get_json()

    # Validate input
    if not data or 'username' not in data or 'email' not in data or 'password' not in data:
        return jsonify({"error": "Missing required fields"}), 400

    # Check if username or email already exists
    existing_user = User.query.filter_by(username=data['username']).first()
    if existing_user:
        return jsonify({"error": "Username already exists"}), 409

    existing_email = User.query.filter_by(email=data['email']).first()
    if existing_email:
        return jsonify({"error": "Email already registered"}), 409

    # Create a new user
    hashed_password = generate_password_hash(data['password'])
    new_user = User(
        username=data['username'],
        email=data['email'],
        password=hashed_password
    )

    db.session.add(new_user)
    db.session.commit()

    # Create access token
    access_token = create_access_token(identity=new_user.id)

    return jsonify({
        "message": "User registered successfully",
        "access_token": access_token,
        "user": {
            "id": new_user.id,
            "username": new_user.username,
            "email": new_user.email
        }
    }), 201


@auth_bp.route('/login', methods=['POST'])
def login():
    """Login a user."""
    data = request.get_json()

    # Validate input
    if not data or 'username' not in data or 'password' not in data:
        return jsonify({"error": "Missing username or password"}), 400

    # Find the user
    user = User.query.filter_by(username=data['username']).first()

    # Check if user exists and password is correct
    if not user or not check_password_hash(user.password, data['password']):
        return jsonify({"error": "Invalid username or password"}), 401

    # Create access token
    access_token = create_access_token(identity=user.id)

    return jsonify({
        "message": "Login successful",
        "access_token": access_token,
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email
        }
    })


@auth_bp.route('/me', methods=['GET'])
@jwt_required()
def get_user_profile():
    """Get the current user's profile."""
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    return jsonify({
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "created_at": user.created_at.isoformat()
        }
    })


@auth_bp.route('/change-password', methods=['POST'])
@jwt_required()
def change_password():
    """Change the user's password."""
    user_id = get_jwt_identity()
    data = request.get_json()

    # Validate input
    if not data or 'current_password' not in data or 'new_password' not in data:
        return jsonify({"error": "Missing required fields"}), 400

    user = User.query.get(user_id)

    # Verify current password
    if not check_password_hash(user.password, data['current_password']):
        return jsonify({"error": "Current password is incorrect"}), 401

    # Update password
    user.password = generate_password_hash(data['new_password'])
    db.session.commit()

    return jsonify({"message": "Password updated successfully"})