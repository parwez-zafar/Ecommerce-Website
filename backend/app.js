const express = require('express');
const errorMiddleware = require('./middleware/error');
const cookieParser = require('cookie-parser');
// const path = require('path');
const app = express();
const cors = require("cors");

const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');





app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));

app.use(fileUpload());
// app.use(express.urlencoded({ limit: "50mb", extended: true }));
dotenv.config({ path: 'backend/config/config.env' });

app.use(cors());



// router imports
const product = require('./routes/productRoute');
const user = require('./routes/userRouter');
const admin = require('./routes/adminRoute');
const order = require('./routes/orderRoute');
const payment = require('./routes/paymentRoute');

// const cookieParser = require('cookie-parser');




app.use('/api/v1', product);
app.use('/api/v1', user);
app.use('/api/v1', admin);
app.use('/api/v1', order);
app.use('/api/v1', payment);


// app.use(express.static(path.join(__dirname, '../frontend/build')));
// app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
// })

// middleware for error
app.use(errorMiddleware);


module.exports = app;