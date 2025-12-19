# Backend Docker Setup

This directory contains Docker configuration for the MERN Burger App backend.

## Files

- `Dockerfile` - Multi-stage production-ready Docker image
- `docker-compose.yml` - Development/production setup with MongoDB
- `.dockerignore` - Files to exclude from Docker build context

## Quick Start

### Using Docker Compose (Recommended)

1. **Build and run the application:**
   ```bash
   docker-compose up --build
   ```

2. **Run in background:**
   ```bash
   docker-compose up -d --build
   ```

3. **Stop the application:**
   ```bash
   docker-compose down
   ```

4. **View logs:**
   ```bash
   docker-compose logs -f backend
   ```

### Using Docker directly

1. **Build the image:**
   ```bash
   docker build -t burger-backend .
   ```

2. **Run the container:**
   ```bash
   docker run -p 5001:5001 -e MONGODB_URI=mongodb://your-mongo-uri burger-backend
   ```

## Environment Variables

The application uses the following environment variables:

- `NODE_ENV` - Environment mode (production/development)
- `MONGODB_URI` - MongoDB connection string
- `PORT` - Server port (default: 5001)
- `JWT_SECRET` - JWT signing secret (add to your .env file)
- `STRIPE_SECRET_KEY` - Stripe payment secret key

## Features

- **Multi-stage build** - Optimized for production with smaller image size
- **Security** - Runs as non-root user
- **MongoDB integration** - Includes MongoDB service in docker-compose
- **Volume persistence** - MongoDB data persists between container restarts
- **Hot reload ready** - Can be extended for development with volume mounts

## Development

For development with hot reload, you can modify the Dockerfile or use volume mounts:

```yaml
# Add to docker-compose.yml for development
volumes:
  - ./src:/app/src
  - ./dist:/app/dist
command: npm run dev
```

## Production Deployment

The Docker setup is production-ready with:

- Minimal attack surface (Alpine Linux base)
- Non-root user execution
- Multi-stage build for smaller images
- Proper dependency management

