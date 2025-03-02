# backend/app/__init__.py
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy
import os

# Initialize SQLAlchemy
db = SQLAlchemy()

# Initialize JWT
jwt = JWTManager()


def create_app(config_name=None):
    """Factory to create the Flask application."""
    app = Flask(__name__)

    # Enable CORS
    CORS(app)

    # Load configuration based on environment
    if config_name is None:
        config_name = os.environ.get('FLASK_ENV', 'development')

    # Load the appropriate configuration
    if config_name == 'production':
        app.config.from_object('config.ProductionConfig')
    elif config_name == 'testing':
        app.config.from_object('config.TestingConfig')
    else:
        app.config.from_object('config.DevelopmentConfig')

    # Initialize extensions
    db.init_app(app)
    jwt.init_app(app)

    with app.app_context():
        # Import blueprints
        from app.routes.auth import auth_bp
        from app.routes.haiku import haiku_bp
        from app.routes.user import user_bp

        # Register blueprints
        app.register_blueprint(auth_bp, url_prefix='/api/auth')
        app.register_blueprint(haiku_bp, url_prefix='/api/haiku')
        app.register_blueprint(user_bp, url_prefix='/api/user')

        # Create a simple index route
        @app.route('/')
        def index():
            return {"message": "Welcome to the Haiku Generator API"}

    return app