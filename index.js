const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const port = process.env.PORT || 3000;

mongoose.connect(`mongodb+srv://ski:${process.env.PASSWORD}@skiapp-898ys.mongodb.net/ski-app?retryWrites=true`, {useNewUrlParser: true})
.then(() => {
console.info('connected');
})
.catch(err => {
  console.error(err.stack);
})

//Routes
let products = require('./routes/products');
let bookings = require('./routes/bookings');

let app = express();

app.use(express.json());
app.use(cors());

app.route('/products')
.get(products.get)
.post(products.post)

app.route('/bookings')
.get(bookings.get)
.post(bookings.post)

app.listen(port, () => {
  console.info(`API up n running port: ${port}`)  //appen lyssnar på en specifik port
})
