const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let productSchema = new Schema({
    article: String,
    brand: String,
    category: String,
    info: String,
    price: Number,
    age: String,
    packages: {
      total: Number,
      booked: Number
    }
})

let Product = mongoose.model('product', productSchema);

module.exports = Product;
