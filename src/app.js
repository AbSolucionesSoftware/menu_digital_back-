const express = require('express');
const cors = require('cors');
const app = express();

//Settings
app.set('port', process.env.PORT || '0.0.0.0');
app.set('host', process.env.HOST || '0.0.0.0');

app.use(cors());

app.use(express.json());

//Rutes
app.use('/api/company',require('./routes/Company'));
app.use('/api/banner',require('./routes/Banner'));
app.use('/api/product',require('./routes/Product'));
app.use('/api/categories',require('./routes/Categories'));
app.use('/api/type',require('./routes/Type'));
app.use('/api/classification',require('./routes/Classification'));
app.use('/api/pedido',require('./routes/Pedido'));
app.use('/api/coupon',require('./routes/Coupons'));

app.use('/api/adminBanner',require('./routes/AdminBanner'));

module.exports = app;   