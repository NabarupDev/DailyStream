const express = require('express');
require('dotenv').config();
const newsRoutes = require('./routes/newsRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/news', newsRoutes);

// Health check route
app.get('/', (req, res) => {
  res.send('NewsAPI Service is running');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
