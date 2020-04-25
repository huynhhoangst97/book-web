const bookItemsDB = require('../../model/book-item.model');
const { check, validationResult } = require('express-validator');

module.exports.getBookAll = async (req, res) => {
    const bookItems = await bookItemsDB.find({});
    res.status(200).json(bookItems);
}

module.exports.insertBook = async (req, res) => {
    
    let { name, author, release, price, number } = req.body

    if(name === undefined | author === undefined | release === undefined | price === undefined | number === undefined) {
        res.status(400).json({
            error: "Invalid Attribute"
        });
        return;
    }

    const objectData = {
        name: name.toLowerCase(),
        author: author.toLowerCase(),
        release: release,
        price: price,
        number: number
    }

    data = await bookItemsDB.find({name: objectData.name});

    if(data != '') {
        if ( data[0]['author'] === objectData.author ) {
            res.status(200).json({
                result: "Book is exist"
            });
            return;
        }
    }
    
    await bookItemsDB.create(objectData)

    res.status(200).json({
        status: 'OK',
        result: {objectData}
    });
}