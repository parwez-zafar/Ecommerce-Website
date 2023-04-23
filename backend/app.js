const express = require('express');
const errorMiddleware = require('./middleware/error');
const cookieParser = require('cookie-parser');
const app = express();
app.use(express.json());
app.use(cookieParser());



// router imports
const product = require('./routes/productRoute');
const user = require('./routes/userRouter');
const admin = require('./routes/adminRoute');
const order = require('./routes/orderRoute');

// const cookieParser = require('cookie-parser');




app.use('/api/v1', product);
app.use('/api/v1', user);
app.use('/api/v1', admin);
app.use('/api/v1', order);


// middleware for error
app.use(errorMiddleware);


module.exports = app;