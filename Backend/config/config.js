require('dotenv').config();

module.exports = {
  port: process.env.PORT || 5000,
  newsApiKey: process.env.NEWS_API_KEY,
  
  // Add any other configuration values here
  newsApiUrl: 'https://newsapi.org/v2'
};
