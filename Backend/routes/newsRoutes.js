const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');

router.get('/', newsController.getNews);

router.get('/search', newsController.searchNews);

module.exports = router;
