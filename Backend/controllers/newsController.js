const axios = require('axios');
const config = require('../config/config');
const { handleApiError } = require('../utils/errorHandler');

exports.getNews = async (req, res) => {
  try {
    const { category, q } = req.query;
    const apiKey = config.newsApiKey;
    
    if (!apiKey) {
      return res.status(500).json({ 
        success: false, 
        message: 'News API key is not configured' 
      });
    }

    let url = 'https://newsapi.org/v2/top-headlines';
    const params = {
      apiKey,
      language: 'en'
    };
    
    // Add category or search query if provided
    if (category) {
      params.category = category;
    } else if (q) {
      params.q = q;
    } else {
      params.category = 'general';
    }

    const response = await axios.get(url, { params });
    
    res.json({
      success: true,
      data: response.data
    });
  } catch (error) {
    console.error('Error fetching news:', error.message);
    handleApiError(error, res);
  }
};

// Search news with smart category detection
exports.searchNews = async (req, res) => {
  try {
    const { q } = req.query;
    const apiKey = config.newsApiKey;
    
    if (!apiKey) {
      return res.status(500).json({ 
        success: false, 
        message: 'News API key is not configured' 
      });
    }

    let url = 'https://newsapi.org/v2/top-headlines';
    const params = {
      apiKey,
      language: 'en'
    };
    
    // Add search query if provided
    if (q) {
      // Check if q might be a category
      const validCategories = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
      
      if (validCategories.includes(q.toLowerCase())) {
        params.category = q.toLowerCase();
      } else {
        params.q = q;
      }
    } else {
      // Default to general category if no parameters provided
      params.category = 'general';
    }

    const response = await axios.get(url, { params });
    
    res.json({
      success: true,
      data: response.data
    });
  } catch (error) {
    console.error(`Error fetching news search:`, error.message);
    handleApiError(error, res);
  }
};
