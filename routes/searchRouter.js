const express = require('express');
const router = express.Router();
const { findProduct } = require('../controllers/searchController');

router.route('/')
    .get(findProduct);

module.exports = router;

