# backend/init_db.py
from app import create_app, db
from app.models.user import User
from app.models.haiku import Haiku

app = create_app()

def init_db():
    """Initialize the database with tables."""
    with app.app_context():
        # Create all tables
        db.create_all()
        print("Database tables created successfully!")

if __name__ == '__main__':
    init_db()