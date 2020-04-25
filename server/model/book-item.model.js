const mongoose = require('mongoose');

const bookItemSchema = new mongoose.Schema({
    name: String,
    author: String,
    release: Number,
    price: String
});

const bookItem = mongoose.model('bookItem', bookItemSchema, 'book-items');
module.exports = bookItem;

