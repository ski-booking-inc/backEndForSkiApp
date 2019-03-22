const mongoose = require('mongoose');
let Schema = mongoose.Schema;

//Create product model, schema
let productSchema = new Schema({
  article: String,
  artnr: Number,
  category: String,
  info: String,
  price: Number,
  age: String
})

let Product = mongoose.model('product', productSchema);

module.exports = Product;
