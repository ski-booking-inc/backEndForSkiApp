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
       // get product info
        let product = await Product.findById(req.body.chosenProduct);
        console.log(product)
        //Kolla om det finns product kvar
        if(product.packages.total >= (product.packages.booked + 1)) {
          let newBooked = product.packages.booked + 1;
        //Om produkter finns, uppdatera kvarvarande summa
          await Product.findOneAndUpdate({_id: req.body.product}, {
            packages: {
              total: product.packages.total,
              booked: newBooked
            }
          })

          //och skapa bokning och skicka dem till db

              let booking = {
                  productId: req.body.chosenProduct._id,    //Kolla med Hans hur man kopplar ihop med ID
                  chosenDates: req.body.chosenDates,
                  userInfo: req.body.userInfo
              }

          // write booking to Mongo
          let resp = await Booking.create(booking);
          // Send to FrontEnd
          res.status(200).send(resp);
        } else {
          res.status(200).send('Sorry, all booked')
        }



    } catch(err) {
        res.status(500).send(err.stack);
    }

}
