const express = require('express');
const router = express.Router();
const controller = require('../controllers/books/books.controller')

router.get('/book/all', controller.getBookAll)
router.post('/book/insert', controller.insertBook)

module.exports = router