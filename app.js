const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const expressValidator = require('express-validator');
const path = require('path')
require('dotenv').config();
// import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
// const braintreeRoutes = require('./routes/braintree');
const orderRoutes = require('./routes/order');

// app
const app = express();
app.use(cors());

// db
mongoose
    .connect('mongodb://manishupadhyaya:manish12345@ds159273.mlab.com:59273/pragmatic', {
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then(() => console.log('DB Connected'));

app.use(express.static(path.join(__dirname, "./client/build")));
// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
// routes middleware
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
// app.use('/api', braintreeRoutes);
app.use('/api', orderRoutes);

const port = process.env.PORT || 8000;

app.get("*", (req, res) => {res.sendFile(path.join(__dirname + "./client/build/index.html"));});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

