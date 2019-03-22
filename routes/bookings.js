let Booking = require('../models/booking');
let Product = require('../models/product');

//Get
module.exports.get = async (req, res) => {
  try {
    res.status(200).send(await Booking.find({}));
  } catch (err) {
    res.status(500).send(err.stack);
  }
}
//Post
module.exports.post = async (req, res) => {
  try {
    //Create booking and post to Mongo
    let booking = {
      productId: req.body.chosenProduct._id,
      artnr: req.body.chosenProduct.artnr,
      username: req.body.username,
      chosenDates: req.body.chosenDates,
      userInfo: req.body.userInfo
    }
    //Write booking to Mongo
    let resp = await Booking.create(booking);
    res.status(200).send(resp);
  } catch (err) {
    res.status(500).send(err.stack);
  }
}
//Delete
module.exports.delete = async (req, res) => {
  try {
    res.status(200).send(await Booking.deleteOne({
      _id: req.params.id
    }))
  } catch (err) {
    res.status(500).send(err.stack);
  }
}
