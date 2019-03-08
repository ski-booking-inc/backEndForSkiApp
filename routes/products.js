// model
let Product = require('../models/product');

// get
module.exports.get = async (req, res) => {
  try {
    res.status(200).send(await Product.find({}));

  }catch(err){
    res.status(500).send(err.stack);
  }
}
// POST
module.exports.post = async (req, res) => {
    try {
        res.status(200).send( await Product.create(req.body));
    } catch(err) {
        res.status(500).send(err.stack);
    }
}
