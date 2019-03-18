let Booking = require('../models/booking');
let Product = require('../models/product');

// GET
module.exports.get = async (req, res) => {
  try {
    res.status(200).send( await Booking.find({}) );
  } catch(err){
    res.status(500).send(err.stack);
  }
}

// POST
module.exports.post = async (req, res) => {
  try {
    //skapa bokning och skicka dem till db
    let booking = {
      productId: req.body.chosenProduct._id,
      artnr: req.body.chosenProduct.artnr,
      username: req.body.username,
      chosenDates: req.body.chosenDates,
      userInfo: req.body.userInfo
    }

    // write booking to Mongo
    let resp = await Booking.create(booking);
    // Send to FrontEnd
    res.status(200).send(resp);

  } catch(err) {
    res.status(500).send(err.stack);
  }

}
// DELETE
module.exports.delete = async (req, res) => {
  try {
    res.status(200).send( await Booking.deleteOne({_id:req.params.id}))
    console.log('hejsan, nu kom vi hit!')
} catch(err) {
    res.status(500).send(err.stack);
}
}
