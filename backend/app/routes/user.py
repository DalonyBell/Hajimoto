# backend/app/routes/user.py
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models.user import User
from app.models.haiku import Haiku
from app import db

user_bp = Blueprint('user', __name__)


@user_bp.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    """Get the user's profile with stats."""
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    # Get user statistics
    haiku_count = Haiku.query.filter_by(user_id=user_id).count()

    # Get theme distribution
    theme_query = db.session.query(
        Haiku.theme, db.func.count(Haiku.id)
    ).filter(
        Haiku.user_id == user_id
    ).group_by(
        Haiku.theme
    ).all()

    theme_distribution = {theme: count for theme, count in theme_query if theme}

    return jsonify({
        "profile": {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "created_at": user.created_at.isoformat()
        },
        "stats": {
            "haiku_count": haiku_count,
            "theme_distribution": theme_distribution
        }
    })


@user_bp.route('/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    """Update the user's profile."""
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    data = request.get_json()

    # Update username if provided
    if 'username' in data and data['username']:
        # Check if username is already taken by another user
        existing = User.query.filter(
            User.username == data['username'],
            User.id != user_id
        ).first()

        if existing:
            return jsonify({"error": "Username already exists"}), 409

        user.username = data['username']

    # Update email if provided
    if 'email' in data and data['email']:
        # Check if email is already taken by another user
        existing = User.query.filter(
            User.email == data['email'],
            User.id != user_id
        ).first()

        if existing:
            return jsonify({"error": "Email already exists"}), 409

        user.email = data['email']

    db.session.commit()

    return jsonify({
        "message": "Profile updated successfully",
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email
        }
    })


@user_bp.route('/account', methods=['DELETE'])
@jwt_required()
def delete_account():
    """Delete the user's account and all associated data."""
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    # Delete all user's haikus
    Haiku.query.filter_by(user_id=user_id).delete()

    # Delete the user
    db.session.delete(user)
    db.session.commit()

    return jsonify({"message": "Account deleted successfully"})