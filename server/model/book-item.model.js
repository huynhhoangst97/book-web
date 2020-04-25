const mongoose = require('mongoose');

const bookItemSchema = new mongoose.Schema({
    name: String,
    author: String,
    release: String,
    price: String,
    number: Number
});

const bookItem = mongoose.model('bookItem', bookItemSchema, 'book-items');
module.exports = bookItem;

