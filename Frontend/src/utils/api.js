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
      //console.log(`Using cached data for ${category} news`);
      return cachedData.data;
    }
    
    const url = `${BASE_URL}/news?category=${category}&page=${page}&pageSize=${pageSize}`;
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
    //console.error("Error fetching news:", error);
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
      //console.log(`Using cached search results for "${query}"`);
      return cachedData.data;
    }
    
    // If no valid cache, fetch from API
    const url = `${BASE_URL}/news/search?q=${encodeURIComponent(query)}&page=${page}&pageSize=${pageSize}`;
    
    //console.log(`Searching news with URL: ${url}`);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      //console.error(`API error: ${response.status} - ${response.statusText}`);
      return {
        status: "ok",
        totalResults: 0,
        articles: []
      };
    }
    
    const data = await response.json();
    
    if (!data.success) {
      //console.warn('API returned unsuccessful response');
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
    //console.error("Error searching news:", error);
    return {
      status: "ok",
      totalResults: 0,
      articles: []
    };
  }
};
