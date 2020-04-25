const bookItemsDB = require('../../model/book-item.model');
const { body, validationResult } = require('express-validator');

module.exports.validate = (method) => {
    switch (method) {
        case 'insertNewBook': {
            return [
                body('name', 'Name field required').not().isEmpty().trim().escape(),
                body('author', 'Author field required').not().isEmpty().trim().escape(),
                body('release', 'Release field required').not().isEmpty().trim().escape(),
                body('price', 'Price field required').not().isEmpty().trim().escape(),
                body('number','Number field required').not().isEmpty().trim().escape(),
                body('number','Wrong field format').isInt()
            ]
        }

        case 'removeBook': {
            return [
                body('name', 'Name field required').not().isEmpty().trim().escape(),
                body('author', 'Author field required').not().isEmpty().trim().escape(),
            ]
        }

        case 'buyBook': {
            return [
                body('name', 'Name field required').not().isEmpty().trim().escape(),
                body('author', 'Author field required').not().isEmpty().trim().escape(),
                body('number','Number field required').not().isEmpty().trim().escape(),
                body('number','Wrong field format').isInt()
            ]
        }
    }
}

module.exports.getBookAll = async (req, res) => {
    const bookItems = await bookItemsDB.find({});
    res.status(200).json(bookItems);
}

module.exports.insertNewBook = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    
    let { name, author, release, price, number } = req.body

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
            res.status(204).json({
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

module.exports.removeBook = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const { name, author } = req.body;
    
    const data = await bookItemsDB.find({name: name});

    if (data == '' || data[0]['author'] != author) {
        res.status(404).json({
            result: "Book is not exist"
        });
        return;
    }
    
    await bookItemsDB.deleteOne({name: name});
    res.status(200).json({
        status: 'OK',
        result: 'Remove successfully'
    })
}

module.exports.buyBook = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const { name, author, number } = req.body;

    const data = await bookItemsDB.find({name: name});

    if (data == '' || data[0]['author'] != author) {
        res.status(404).json({
            result: "Book is not exist"
        });
        return;
    }

    const deltaNumber = data[0]['number'] - number;

    if (deltaNumber >= 0) {
        await bookItemsDB.updateOne({name: name}, {number: deltaNumber});
        return res.status(200).json({
            status: 'OK',
            result: 'Buy successfully'
        })
    } else {
        return res.status(404).json({
            result: 'Please decrease number of this book'
        })
    }
}