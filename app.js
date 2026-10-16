const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect(
    'mongodb+srv://fenachangela8_db_user:' + process.env.MONGO_ATLAS_PW + '@cluster0.ldf6kdc.mongodb.net/'
);

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

// Body Parser Middleware (to parse JSON and urlencoded data)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes which should handle requests
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

// Error handling for requests not caught by routes
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;