# backend/app/routes/haiku.py
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.services.haiku_generator import HaikuGenerator
from app.models.haiku import Haiku
from app import db
import os

haiku_bp = Blueprint('haiku', __name__)

# Initialize the haiku generator
# In a production environment, we would want to load a more comprehensive word database
generator = HaikuGenerator()


@haiku_bp.route('/generate', methods=['GET'])
def generate_haiku():
    """Generate a new haiku poem."""
    theme = request.args.get('theme')
    count = request.args.get('count', 1, type=int)

    # Validate count parameter
    if count < 1 or count > 10:
        return jsonify({"error": "Count must be between 1 and 10"}), 400

    # Generate haikus
    if count == 1:
        haiku = generator.generate_haiku(theme)
        return jsonify(haiku)
    else:
        haikus = generator.generate_multiple_haikus(count, theme)
        return jsonify(haikus)


@haiku_bp.route('/themes', methods=['GET'])
def get_themes():
    """Get available haiku themes."""
    themes = generator.get_available_themes()
    return jsonify({"themes": themes})


@haiku_bp.route('/save', methods=['POST'])
@jwt_required()
def save_haiku():
    """Save a haiku to the user's collection."""
    user_id = get_jwt_identity()
    data = request.get_json()

    if not data or 'line1' not in data or 'line2' not in data or 'line3' not in data:
        return jsonify({"error": "Missing haiku lines"}), 400

    # Create a new haiku record
    haiku = Haiku(
        user_id=user_id,
        line1=data['line1'],
        line2=data['line2'],
        line3=data['line3'],
        theme=data.get('theme')
    )

    db.session.add(haiku)
    db.session.commit()

    return jsonify({"message": "Haiku saved successfully", "id": haiku.id}), 201


@haiku_bp.route('/collection', methods=['GET'])
@jwt_required()
def get_collection():
    """Get the user's saved haiku collection."""
    user_id = get_jwt_identity()

    haikus = Haiku.query.filter_by(user_id=user_id).all()
    result = []

    for haiku in haikus:
        result.append({
            "id": haiku.id,
            "line1": haiku.line1,
            "line2": haiku.line2,
            "line3": haiku.line3,
            "theme": haiku.theme,
            "created_at": haiku.created_at.isoformat()
        })

    return jsonify({"haikus": result})


@haiku_bp.route('/collection/<int:haiku_id>', methods=['DELETE'])
@jwt_required()
def delete_haiku(haiku_id):
    """Delete a haiku from the user's collection."""
    user_id = get_jwt_identity()

    haiku = Haiku.query.filter_by(id=haiku_id, user_id=user_id).first()

    if not haiku:
        return jsonify({"error": "Haiku not found"}), 404

    db.session.delete(haiku)
    db.session.commit()

    return jsonify({"message": "Haiku deleted successfully"})


@haiku_bp.route('/add-word', methods=['POST'])
@jwt_required()
def add_word():
    """Add a new word to the dictionary."""
    data = request.get_json()

    if not data or 'word' not in data or 'syllables' not in data:
        return jsonify({"error": "Missing word or syllable count"}), 400

    word = data['word'].strip().lower()
    syllables = data['syllables']

    # Basic validation
    if not word:
        return jsonify({"error": "Word cannot be empty"}), 400

    try:
        syllables = int(syllables)
    except ValueError:
        return jsonify({"error": "Syllable count must be a number"}), 400

    if syllables <= 0:
        return jsonify({"error": "Syllable count must be positive"}), 400

    # Add the word to the generator
    success = generator.add_word(word, syllables)

    if success:
        return jsonify({"message": f"Added word '{word}' with {syllables} syllables"})
    else:
        return jsonify({"error": "Failed to add word"}), 400