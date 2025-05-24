# DailyStream Backend API

A production-ready RESTful API service that aggregates and delivers news content from multiple sources through NewsAPI integration.

## Overview

DailyStream Backend is an enterprise-grade news aggregation service designed to provide scalable, reliable access to global news content. The service leverages the NewsAPI to deliver customizable news feeds with advanced filtering capabilities.

## Features

- **Category-based News Retrieval**: Access curated news content filtered by industry categories
- **Advanced Search Functionality**: Sophisticated search algorithm with smart category detection
- **Robust Error Handling**: Comprehensive error management for reliable client experiences
- **Environment-based Configuration**: Flexible deployment across development, staging, and production environments
- **RESTful Architecture**: Follows industry best practices for API design and implementation

## Technical Requirements

- Node.js (v14.x or later)
- NPM or Yarn package manager
- NewsAPI credentials (available at [newsapi.org](https://newsapi.org))

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd DailyStream/Backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   ```bash
   cp .env.example .env
   ```

4. Add your NewsAPI credentials to the `.env` file

## Deployment

### Development Environment

```bash
npm run dev
```

### Production Environment

```bash
npm start
```

The service will initialize on the configured port (default: 5000).

## API Documentation

### Base URL

```
http://{host}:{port}/api
```

### Endpoints

#### Retrieve Headlines

```
GET /news
```

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| category | string | No | News category identifier (business, entertainment, general, health, science, sports, technology) |
| q | string | No | Search query parameter |

**Example Request:**
```
GET /news?category=technology
```

#### Search News Content

```
GET /news/search
```

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| q | string | Yes | Search term or category identifier |

**Example Request:**
```
GET /news/search?q=artificial+intelligence
```

### Response Structure

#### Success Response

```json
{
  "success": true,
  "data": {
    "status": "ok",
    "totalResults": 123,
    "articles": [
      {
        "source": { "id": "source-id", "name": "Source Name" },
        "author": "Author Name",
        "title": "Article Title",
        "description": "Article description",
        "url": "https://article-url.com",
        "urlToImage": "https://image-url.com",
        "publishedAt": "2023-01-01T00:00:00Z",
        "content": "Article content"
      }
    ]
  }
}
```

#### Error Response

```json
{
  "success": false,
  "message": "Error description"
}
```

## Configuration

| Environment Variable | Description | Default Value |
|----------------------|-------------|---------------|
| PORT | Application server port | 5000 |
| NEWS_API_KEY | NewsAPI authentication token | Required |

## Architecture

```
DailyStream/Backend/
├── config/           # Configuration management
├── controllers/      # Business logic implementation
├── routes/           # Endpoint definitions
├── utils/            # Helper functions and middleware
├── server.js         # Application entry point
```

## Error Handling Strategy

The application implements a centralized error handling mechanism that:

1. Captures API-specific error codes and messages
2. Provides standardized error responses to clients
3. Logs detailed error information for debugging
4. Maintains appropriate HTTP status codes for various error scenarios

## Security Implementation

- Environment-based configuration management
- Input validation and sanitization
- Error handling without sensitive data exposure
- Standard security headers implementation

## 🤝 Contributing

Contributions are welcome! Here's how you can contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

Please make sure to update tests as appropriate and adhere to the existing coding style.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Nabarup Roy**

- Website: [nabaruproy.me](https://nabaruproy.me/)
- GitHub: [@NabarupDev](https://github.com/NabarupDev)
- LinkedIn: [Nabarup Roy](https://linkedin.com/in/nabarup-roy)