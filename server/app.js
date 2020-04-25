const express = require('express');
const port = 8000;
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose')

require('dotenv').config()

// config express 
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

// config mongoose
const optionMongoose = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.connect(process.env.URI_MONGOOSE, optionMongoose, () => console.log('connected to DB!'));

// Route
const apiRoute = require('./routes/api.route');

app.use('/api', apiRoute);

app.listen(port, () => {
    console.log('Server is running...');
})