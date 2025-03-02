# backend/app/models/haiku.py
from datetime import datetime
from app import db


class Haiku(db.Model):
    """Haiku model for storing haiku poems."""
    __tablename__ = 'haikus'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    line1 = db.Column(db.String(100), nullable=False)
    line2 = db.Column(db.String(100), nullable=False)
    line3 = db.Column(db.String(100), nullable=False)
    theme = db.Column(db.String(50), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<Haiku {self.id}: {self.line1[:10]}...>'