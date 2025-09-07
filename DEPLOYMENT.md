# Deployment Guide

This guide covers how to deploy your URL shortener to popular cloud platforms.

## Quick Deploy Options

### 1. Railway (Recommended - Easy & Free)

**Backend Deployment:**
1. Go to [railway.app](https://railway.app) and sign up
2. Connect your GitHub account
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your `url-shortener` repository
5. Railway will auto-detect Django and deploy using the `railway.json` config
6. Set environment variables:
   - `SECRET_KEY`: Generate a new secret key
   - `DEBUG`: Set to `false`
   - `ALLOWED_HOSTS`: Your Railway domain (e.g., `your-app.railway.app`)

**Frontend Deployment:**
1. Create another Railway service
2. Set environment variables:
   - `BACKEND_URL`: Your backend Railway URL
3. Deploy from the same repo (Railway will detect Node.js)

### 2. Render (Free Tier Available)

**Backend:**
1. Go to [render.com](https://render.com)
2. Connect GitHub and select your repository
3. Choose "Web Service"
4. Configure:
   - Build Command: `cd backend && pip install -r requirements.txt`
   - Start Command: `cd backend && python manage.py migrate && gunicorn urlshortener.wsgi`

**Frontend:**
1. Create another Web Service
2. Configure:
   - Build Command: `cd frontend && npm install`
   - Start Command: `cd frontend && npm start`

### 3. Heroku

**Backend:**
1. Install Heroku CLI
2. Create Heroku app: `heroku create your-url-shortener-backend`
3. Set environment variables:
   ```bash
   heroku config:set SECRET_KEY=your-secret-key
   heroku config:set DEBUG=False
   heroku config:set ALLOWED_HOSTS=your-app.herokuapp.com
   ```
4. Deploy:
   ```bash
   git subtree push --prefix backend heroku main
   ```

**Frontend:**
1. Create another Heroku app: `heroku create your-url-shortener-frontend`
2. Set environment variable:
   ```bash
   heroku config:set BACKEND_URL=https://your-backend-app.herokuapp.com
   ```

### 4. Vercel (Frontend) + Railway/Render (Backend)

**Frontend on Vercel:**
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Set Root Directory to `frontend`
4. Add environment variable: `BACKEND_URL`

## Environment Variables Reference

### Backend (Django)
- `SECRET_KEY`: Django secret key (generate new for production)
- `DEBUG`: Set to `False` for production
- `ALLOWED_HOSTS`: Comma-separated list of allowed hosts
- `CORS_ALLOWED_ORIGINS`: Comma-separated list of frontend URLs

### Frontend (Node.js)
- `PORT`: Port number (usually set by hosting platform)
- `BACKEND_URL`: URL of your deployed backend

## Production Checklist

- [ ] Generate new SECRET_KEY for Django
- [ ] Set DEBUG=False
- [ ] Configure ALLOWED_HOSTS
- [ ] Set up proper CORS origins
- [ ] Test both frontend and backend deployments
- [ ] Update README with live demo links

## Generating Secret Key

Run this in Python to generate a new secret key:

```python
from django.core.management.utils import get_random_secret_key
print(get_random_secret_key())
```

## Testing Deployment

After deployment:
1. Test URL shortening via your frontend
2. Test direct API endpoints
3. Test URL redirection
4. Check that click counting works

## Troubleshooting

- **CORS errors**: Check CORS_ALLOWED_ORIGINS includes your frontend domain
- **500 errors**: Check logs for missing environment variables
- **Database errors**: Ensure migrations run during deployment
- **Static files**: Make sure STATIC_ROOT is configured