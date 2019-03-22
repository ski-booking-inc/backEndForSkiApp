let Product = require('../models/product');
let auth = require('./auth');

//Get
module.exports.get = async (req, res) => {
  try {
    res.status(200).send(await Product.find({}));
  } catch (err) {
    res.status(500).send(err.stack);
  }
}
//Post
module.exports.post = async (req, res) => {
  try {
    res.status(200).send(await Product.create(req.body));
  } catch (err) {
    res.status(500).send(err.stack);
  }
}
//Delete
module.exports.delete = async (req, res) => {
  try {
    res.status(200).send(await Product.deleteOne({
      _id: req.params.id
    }))
  } catch (err) {
    res.status(500).send(err.stack);
  }
}
//Update
module.exports.put = async (req, res) => {
  try {
    if (await auth.isAdmin(req.headers.authorization)) {
      res.status(200).send(await Product.findOneAndUpdate({
          _id: req.body._id
        },
        req.body))
    }
  } catch {
    res.status(404).send(err.stack);
  }
}
