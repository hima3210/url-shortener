# URL Shortener

A simple URL shortener built with Django (backend) and Node.js (frontend).

## Features

- ✨ Shorten long URLs to 6-character codes
- 📊 Track click counts for each shortened URL
- 🎯 Clean, responsive web interface
- 🔄 Real-time updates of URL list
- 🚀 RESTful API endpoints

## Tech Stack

**Backend (Django)**
- Django 5.2.6
- Django REST Framework
- SQLite database
- CORS headers for frontend communication

**Frontend (Node.js)**
- Express.js server
- Vanilla JavaScript
- HTML/CSS interface
- Axios for API calls

## Local Setup

### Prerequisites
- Python 3.8+
- Node.js 14+
- pip and npm

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Create and activate virtual environment:
```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install django djangorestframework django-cors-headers
```

4. Run migrations:
```bash
python manage.py migrate
```

5. Start Django server:
```bash
python manage.py runserver
```

The backend will be available at http://localhost:8000

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

The frontend will be available at http://localhost:3000

## Usage

1. Open http://localhost:3000 in your browser
2. Enter a URL you want to shorten
3. Click "Shorten URL"
4. Your shortened URL will be displayed
5. View all your shortened URLs in the list below

## API Endpoints

- `POST /api/shorten/` - Create a shortened URL
- `GET /api/urls/` - Get all shortened URLs
- `GET /api/stats/<code>/` - Get statistics for a specific URL
- `GET /<code>/` - Redirect to original URL

## Project Structure

```
url-shortener/
├── backend/
│   ├── urlshortener/
│   │   ├── settings.py
│   │   └── urls.py
│   ├── shortener/
│   │   ├── models.py
│   │   ├── views.py
│   │   ├── serializers.py
│   │   └── urls.py
│   ├── manage.py
│   └── venv/
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   └── script.js
│   ├── server.js
│   ├── package.json
│   └── node_modules/
└── README.md
```

## Deployment

This project can be deployed on platforms like:
- **Backend**: Railway, Heroku, DigitalOcean
- **Frontend**: Vercel, Netlify, Railway

See deployment instructions in the respective platform documentation.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License