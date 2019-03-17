let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//skapa ett schema
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

// skapa modell baserat på schemat
let Booking = mongoose.model('booking', bookingSchema);

module.exports = Booking;
