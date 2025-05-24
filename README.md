# DailyStream

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-green)

DailyStream is a modern, full-stack news aggregation platform that delivers real-time news content from multiple sources with an intuitive user interface. The application is built using React for the frontend and Node.js/Express for the backend API.

## 📋 Table of Contents

- [Features](#-features)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Usage](#-usage)
- [API Reference](#-api-reference)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Performance Considerations](#-performance-considerations)
- [Security Considerations](#-security-considerations)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)
- [Acknowledgments](#-acknowledgments)

## ✨ Features

### Frontend
- **Category-Based News Browsing**: Access top headlines by industry categories
- **Advanced Search Functionality**: Keyword search with infinite scroll pagination
- **Responsive Design**: Optimal UX across desktop, tablet, and mobile devices
- **Performance Optimized**: Lazy loading, client-side caching, and code splitting
- **Accessibility Compliant**: ARIA attributes and keyboard navigation support

### Backend
- **RESTful API**: Clean, well-documented endpoints for news consumption
- **Caching Strategy**: Reduces redundant external API calls
- **Error Handling**: Comprehensive error management
- **Environment Configuration**: Flexible deployment across dev, staging, and production

## 🏗 Architecture

DailyStream follows a modern client-server architecture:

```
DailyStream/
├── Frontend/          # React application (Vite)
│   ├── src/           # Source code
│   │   ├── components/# Reusable UI components
│   │   ├── pages/     # Page-level components
│   │   └── utils/     # Utility functions
│   └── ...
├── Backend/           # Express.js API server
│   ├── config/        # Configuration management
│   ├── controllers/   # API business logic
│   ├── routes/        # API endpoint definitions
│   └── utils/         # Helper functions
└── ...
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18.x or later)
- npm or yarn package manager
- NewsAPI API key ([Get one here](https://newsapi.org))

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/NabarupDev/dailystream.git
   cd dailystream
   ```

2. **Backend Setup:**
   ```bash
   cd Backend
   npm install
   cp .env.example .env
   # Add your NewsAPI key to .env
   ```

3. **Frontend Setup:**
   ```bash
   cd ../Frontend
   npm install
   cp .env.example .env
   # Configure your Backend API URL in .env if needed
   ```

### Configuration

#### Backend Environment Variables
```
PORT=5000
NEWS_API_KEY=your_newsapi_key_here
```

#### Frontend Environment Variables
```
VITE_API_URL=http://localhost:5000
```

## 🖥 Usage

### Running the Backend

```bash
cd Backend
npm run dev   # Development mode with hot reload
# OR
npm start     # Production mode
```

### Running the Frontend

```bash
cd Frontend
npm run dev   # Development mode with hot reload
# OR
npm run build # Build for production
npm run preview # Preview production build
```

Once both services are running:
- Backend API: http://localhost:5000
- Frontend application: http://localhost:5173

## 📚 API Reference

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### Get Headlines
```
GET /news
```

**Parameters:**
| Parameter | Type   | Required | Description                |
|-----------|--------|----------|----------------------------|
| category  | string | No       | News category identifier   |
| page      | number | No       | Page number for pagination |
| pageSize  | number | No       | Items per page             |

#### Search News
```
GET /news/search
```

**Parameters:**
| Parameter | Type   | Required | Description                |
|-----------|--------|----------|----------------------------|
| q         | string | Yes      | Search query               |
| page      | number | No       | Page number for pagination |
| pageSize  | number | No       | Items per page             |

## 💻 Technology Stack

### Frontend
- **React**: UI framework
- **Vite**: Build tool
- **TailwindCSS**: Utility-first CSS framework
- **React Router**: Client-side routing

### Backend
- **Node.js**: JavaScript runtime
- **Express**: Web server framework
- **Axios**: HTTP client for API requests
- **Dotenv**: Environment configuration

## 📁 Project Structure

### Frontend Structure

```
Frontend/
├── public/            # Static assets
├── src/
│   ├── assets/        # Images, fonts, etc.
│   ├── components/    # Reusable UI components
│   │   ├── Footer.jsx
│   │   ├── LazyImage.jsx
│   │   ├── Navbar.jsx
│   │   ├── NewsCard.jsx
│   │   ├── NewsGrid.jsx
│   │   └── SkeletonCard.jsx
│   ├── pages/         # Page-level components
│   │   └── Home.jsx
│   ├── utils/         # Utility functions
│   │   └── api.js     # API integration
│   ├── App.jsx        # Main application component
│   ├── App.css        # Global styles
│   ├── main.jsx       # Application entry point
│   └── index.css      # Base styles
└── ...
```

### Backend Structure

```
Backend/
├── config/            # Configuration
│   └── config.js      # Environment configuration
├── controllers/       # Request handlers
│   └── newsController.js
├── routes/            # API routes
│   └── newsRoutes.js
├── utils/             # Utility functions
│   └── errorHandler.js
├── server.js          # Server entry point
└── ...
```

## 🚀 Performance Considerations

- **Frontend**:
  - Lazy image loading
  - Client-side caching with configurable expiry
  - Code splitting for optimized bundles
  - Infinite scroll with intersection observer

- **Backend**:
  - Response compression
  - Error handling with proper status codes
  - Efficient API usage to minimize external calls

## 🔒 Security Considerations

- Environment variables for sensitive data
- Input validation and sanitization
- CORS configuration
- Proper error handling without sensitive information exposure

## ✅ Testing

### Frontend Tests
```bash
cd Frontend
npm run test
```

### Backend Tests
```bash
cd Backend
npm run test
```

## 📦 Deployment

### Frontend Deployment
The frontend is built as a static site and can be deployed to any static hosting service:

```bash
cd Frontend
npm run build
# Deploy the dist/ directory to your hosting service
```

### Backend Deployment
The backend is a standard Node.js application:

```bash
cd Backend
npm install --production
# Set environment variables
npm start
```

## 👥 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your code follows the project's style guidelines and includes appropriate tests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [NewsAPI](https://newsapi.org) for providing the news data
- All open source contributors whose libraries made this project possible

---

Developed by [Nabarup Roy](https://github.com/NabarupDev)
