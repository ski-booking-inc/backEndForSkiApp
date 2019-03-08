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
        let product = await Product.findById(req.body.product);
        //Kolla om det finns product kvar
        if(product.packages.total >= (product.packages.booked + req.body.amount)) {     //amount är vårt datum
          let newBooked = product.products.booked + req.body.amount;
        //Om produkter finns, uppdatera kvarvarande summa
          await Product.findOneAndUpdate({_id: req.body.product}, {
            packages: {
              total: newBooked,
              booked: products.packages.booked
            }
          })
          //och skapa bokning och skicka dem till db
          let bookings = [];
          for(i=0; i<req.body.amount; i++){
              let booking = {
                  productId: productId,    //Kolla med Hans hur man kopplar ihop med ID
                  rentDate: Date,          //
                  returnDate: Date
              }
              bookings.push(booking);
          }

          // write booking to Mongo
          let resp = await Booking.create(bookings);
          // Send to FrontEnd
          res.status(200).send(resp);
        } else {
          res.status(200).send('Sorry, all booked')
        }



    } catch(err) {
        res.status(500).send(err.stack);
    }

}
