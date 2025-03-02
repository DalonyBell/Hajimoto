# Haiku Generator Full-Stack Application

A modern full-stack application for generating, saving, and managing haiku poems. This project showcases various technologies and best practices in web development, DevOps, and data science.

## Features

- **Haiku Generation**: Generate haikus with a 5-7-5 syllable pattern
- **Theme Selection**: Create haikus with specific themes (nature, seasons, emotions, etc.)
- **User Authentication**: Register, login, and manage your profile
- **Personal Haiku Collection**: Save your favorite haikus and manage your collection
- **Analytics Dashboard**: View statistics about your haiku collection

## Technology Stack

### Backend
- **Framework**: Flask (Python)
- **Authentication**: JWT (JSON Web Tokens)
- **Database**: SQLAlchemy with SQLite (development) / PostgreSQL (production)
- **API**: RESTful API design
- **Testing**: Pytest

### Frontend (Coming Soon)
- **Framework**: React with TypeScript
- **State Management**: React Context API / Redux
- **Styling**: CSS Modules / Tailwind CSS
- **Testing**: Jest and React Testing Library

### DevOps
- **Containerization**: Docker
- **CI/CD**: GitHub Actions
- **Infrastructure as Code**: Terraform
- **Cloud Deployment**: AWS/GCP (planned)
- **Monitoring**: Prometheus and Grafana (planned)

## Getting Started

### Prerequisites
- Python 3.8 or higher
- Node.js 16 or higher (for frontend)
- Docker and Docker Compose (optional, for containerized development)

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/haiku-generator.git
   cd haiku-generator
   ```

2. Set up a Python virtual environment:
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Initialize the database:
   ```bash
   python init_db.py
   ```

5. Run the development server:
   ```bash
   python run.py
   ```

   The backend will be available at `http://localhost:5000`.

### Frontend Setup (Coming Soon)

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

   The frontend will be available at `http://localhost:3000`.

### Docker Setup

To run the entire application using Docker:

```bash
docker-compose up
```

## API Documentation

### Authentication

- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Login and receive an access token
- `GET /api/auth/me`: Get current user profile
- `POST /api/auth/change-password`: Change user password

### Haiku Operations

- `GET /api/haiku/generate`: Generate a new haiku (optional query params: theme, count)
- `GET /api/haiku/themes`: Get a list of available themes
- `POST /api/haiku/save`: Save a haiku to your collection
- `GET /api/haiku/collection`: Get your saved haiku collection
- `DELETE /api/haiku/collection/{id}`: Delete a haiku from your collection
- `POST /api/haiku/add-word`: Add a new word to the haiku dictionary

### User Profile

- `GET /api/user/profile`: Get user profile with statistics
- `PUT /api/user/profile`: Update user profile information
- `DELETE /api/user/account`: Delete user account and all associated data

## Project Structure

```
haiku-generator/
├── backend/               # Python Flask backend
│   ├── app/
│   │   ├── __init__.py    # Flask app initialization
│   │   ├── models/        # Database models
│   │   ├── routes/        # API endpoints
│   │   ├── services/      # Business logic
│   │   │   └── haiku_generator.py  # Haiku generation logic
│   │   └── utils/         # Helper functions
│   ├── tests/             # Backend tests
│   ├── config.py          # Configuration
│   ├── requirements.txt   # Python dependencies
│   └── Dockerfile         # Backend containerization
├── frontend/              # React frontend (coming soon)
│   ├── public/
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page layouts
│   │   ├── services/      # API integration
│   │   └── styles/        # CSS/SCSS files
│   ├── package.json       # JS dependencies
│   └── Dockerfile         # Frontend containerization
├── docker-compose.yml     # Local development setup
├── .github/workflows/     # CI/CD pipeline
├── terraform/             # Infrastructure as code
└── README.md              # Project documentation
```

## Development Roadmap

- [x] Core Haiku generation logic
- [x] Flask RESTful API
- [x] User authentication
- [x] Haiku collection management
- [ ] React frontend
- [ ] User analytics dashboard
- [ ] Improved word dictionary and syllable counting
- [ ] Social features (sharing, liking haikus)
- [ ] Cloud deployment with Terraform
- [ ] CI/CD pipeline with GitHub Actions
- [ ] Monitoring and observability

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- All the open-source libraries and frameworks that made this project possible
- The poetry community for inspiration on haiku structures and themes
