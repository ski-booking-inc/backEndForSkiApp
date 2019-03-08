let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//skapa ett schema
let bookingSchema = new Schema({
  productId: String,
  rentDate: String,
  returnDate: String
});

// skapa modell baserat på schemat
let Booking = mongoose.model('booking', bookingSchema);

module.exports = Booking;
