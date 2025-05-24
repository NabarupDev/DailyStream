# DailyStream Frontend

A production-ready, responsive news aggregator web application built with React, Vite, and Tailwind CSS. The frontend consumes the DailyStream Backend API to deliver real-time news content with a seamless user experience.

## Overview

DailyStream Frontend is designed to provide users with a modern, intuitive interface for browsing and searching news articles across multiple categories. The application emphasizes performance, accessibility, and scalability, making it suitable for both enterprise and consumer use cases.

## Features

- **Category-Based News Browsing**: Instantly access top headlines by category (General, Technology, Business, Sports, Health, Entertainment, Science)
- **Advanced Search**: Search news articles by keyword with infinite scroll and smart pagination
- **Responsive UI**: Fully responsive layout for desktop, tablet, and mobile devices
- **Performance Optimizations**: Fast load times with Vite, code splitting, and image lazy loading
- **Client-Side Caching**: Reduces redundant API calls and enhances user experience
- **Accessibility**: Semantic HTML, keyboard navigation, and ARIA support
- **Robust Error Handling**: User-friendly error messages and fallback UI
- **Developer Experience**: Hot reload, strict linting, and modular codebase

## Technical Requirements

- Node.js (v18.x or later)
- NPM or Yarn package manager
- Access to a running [DailyStream Backend API](../Backend/README.md)

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/NabarupDev/weather-dashboard.git
   cd DailyStream/Frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env to set your backend API URL
   ```

   Example `.env`:
   ```
   VITE_API_URL=http://localhost:5000
   ```

## Deployment

### Development Environment

```bash
npm run dev
# or
yarn dev
```
Visit [http://localhost:5173](http://localhost:5173) in your browser.

### Production Environment

```bash
npm run build
# or
yarn build
```
To preview the production build locally:
```bash
npm run preview
# or
yarn preview
```

## API Integration

The frontend communicates with the backend via RESTful endpoints, using the `/api` proxy for all requests. See the [Backend API documentation](../Backend/README.md) for available endpoints and response formats.

## Project Structure

```
Frontend/
├── public/           # Static assets
├── src/
│   ├── components/   # Reusable UI components
│   ├── pages/        # Page-level components
│   ├── utils/        # Utility functions (API, helpers)
│   ├── App.jsx       # Main app entry
│   └── main.jsx      # Vite entry point
├── index.html
├── vite.config.js
├── tailwind.config.js
└── ...
```

## Code Quality

Lint the codebase using ESLint:
```sh
npm run lint
# or
yarn lint
```

## Environment Variables

- `VITE_API_URL`: Base URL for the backend API (proxied via Vite during development).

## Customization

- **Categories**: To modify news categories, update the `categories` array in `src/components/Navbar.jsx` and `src/components/Footer.jsx`.
- **Styling**: Tailwind CSS is used for all styling. Adjust or extend via `tailwind.config.js` as needed.

## Contribution

Contributions are welcome. Please follow the established code style and naming conventions.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Developed by [Your Name] as part of my internship project.**
