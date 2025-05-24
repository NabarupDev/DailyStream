/**
 * Handle API errors consistently across the application
 * @param {Error} error - The error object
 * @param {Response} res - Express response object
 */
exports.handleApiError = (error, res) => {
  return res.status(error.response?.status || 500).json({
    success: false,
    message: error.response?.data?.message || 'Failed to fetch news data'
  });
};
