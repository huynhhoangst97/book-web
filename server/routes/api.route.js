const express = require('express');
const router = express.Router();
const controller = require('../controllers/books/books.controller')

router.get('/book/all', controller.getBookAll)
router.post('/book/insert', controller.validate('insertNewBook'), controller.insertNewBook)
router.post('/book/buy', controller.validate('buyBook'), controller.buyBook)
router.delete('/book/remove', controller.validate('removeBook'), controller.removeBook)

module.exports = router