const BASE_URL = "/api";

// Cache configuration
const CACHE_EXPIRY_MS = 5 * 60 * 1000; // 5 minutes
const CACHE_KEYS = {
  TOP_HEADLINES: "dailystream_top_headlines_",
  SEARCH: "dailystream_search_"
};

/**
 * Check if cache is valid (exists and not expired)
 * @param {Object} cachedData - The cached data with timestamp
 * @returns {boolean} Whether the cache is still valid
 */
const isCacheValid = (cachedData) => {
  if (!cachedData || !cachedData.timestamp) return false;
  
  const now = new Date().getTime();
  return (now - cachedData.timestamp) < CACHE_EXPIRY_MS;
};

/**
 * Get the API base URL from environment or use the relative path for proxy
 * @returns {string} API base URL
 */
const getApiBaseUrl = () => {
  // During development, use relative path which will be handled by Vite's proxy
  // In production, respect the explicitly provided API URL
  return import.meta.env.DEV ? BASE_URL : 
    (import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : BASE_URL);
};

/**
 * Fetch top headlines by category
 * @param {string} category - News category (general, business, sports, etc.)
 * @param {number} page - Page number to fetch
 * @param {number} pageSize - Number of articles per page
 * @returns {Promise} Promise with news articles
 */
export const fetchTopHeadlines = async (category = "general", page = 1, pageSize = 10) => {
  try {
    // For paginated requests, only use cache for the first page
    const cacheKey = `${CACHE_KEYS.TOP_HEADLINES}${category}`;
    const cachedData = page === 1 ? JSON.parse(localStorage.getItem(cacheKey)) : null;
    
    if (cachedData && isCacheValid(cachedData)) {
      return cachedData.data;
    }
    
    const apiBaseUrl = getApiBaseUrl();
    const url = `${apiBaseUrl}/news?category=${category}&page=${page}&pageSize=${pageSize}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.success) {
      throw new Error('API returned unsuccessful response');
    }
    
    if (page === 1) {
      localStorage.setItem(cacheKey, JSON.stringify({
        timestamp: new Date().getTime(),
        data: data.data
      }));
    }
    
    return data.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Search for news articles by keyword
 * @param {string} query - Search term
 * @param {number} page - Page number to fetch
 * @param {number} pageSize - Number of articles per page
 * @returns {Promise} Promise with search results
 */
export const searchNews = async (query, page = 1, pageSize = 10) => {
  try {
    // For paginated requests, only use cache for the first page
    const cacheKey = `${CACHE_KEYS.SEARCH}${query}`;
    const cachedData = page === 1 ? JSON.parse(localStorage.getItem(cacheKey)) : null;
    
    if (cachedData && isCacheValid(cachedData)) {
      return cachedData.data;
    }
    
    // If no valid cache, fetch from API
    const apiBaseUrl = getApiBaseUrl();
    const url = `${apiBaseUrl}/news/search?q=${encodeURIComponent(query)}&page=${page}&pageSize=${pageSize}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      return {
        status: "ok",
        totalResults: 0,
        articles: []
      };
    }
    
    const data = await response.json();
    
    if (!data.success) {
      return {
        status: "ok",
        totalResults: 0,
        articles: []
      };
    }
    
    if (page === 1) {
      localStorage.setItem(cacheKey, JSON.stringify({
        timestamp: new Date().getTime(),
        data: data.data
      }));
    }
    
    return data.data;
  } catch (error) {
    return {
      status: "ok",
      totalResults: 0,
      articles: []
    };
  }
};
