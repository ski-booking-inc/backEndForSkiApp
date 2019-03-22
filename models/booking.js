let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//Create booking model, schema
let bookingSchema = new Schema({
  productId: String,
  artnr: Number,
  username: String,
  chosenDates: {
    startDate: String,
    stopDate: String
  },
  userInfo: {
    name: String,
    length: Number,
    weight: Number,
    shoe: Number,
    lift: Boolean,
    helmet: Boolean,
    skigoogles: Boolean
  }
});

let Booking = mongoose.model('booking', bookingSchema);

module.exports = Booking;
