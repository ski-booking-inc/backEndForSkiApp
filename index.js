const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const port = process.env.PORT || 3000;
const jsonwebtoken = require('jsonwebtoken');

//Mongoose connection
mongoose.connect(`mongodb+srv://ski:${process.env.PASSWORD}@skiapp-898ys.mongodb.net/ski-app?retryWrites=true`, {
    useNewUrlParser: true
  })
  .then(() => {
    console.info('connected');
  })
  .catch(err => {
    console.error(err.stack);
  })

//Routes
let products = require('./routes/products');
let bookings = require('./routes/bookings');
let auth = require('./routes/auth');
let users = require('./routes/users');

let app = express();

//Routes connections
app.use(express.json());
app.use(cors());

app.route('/products')
  .get(products.get)
  .post(products.post)
  .put(products.put)

app.route('/products/:id')
  .delete(products.delete)

app.route('/bookings')
  .get(bookings.get)
  .post(bookings.post)

app.route('/bookings/:id')
  .delete(bookings.delete)

app.route('/auth')
  .post(auth.post)

app.route('/users')
  .post(users.post)

// Auth middleware
app.use((req, res, next) => {
  console.log(req.headers)

  if (auth.verifyToken(req.headers.authorization)) {
    next()
  } else {
    res.status(403).send('Access Denied.')
  }

})

app.listen(port, () => {
  console.info(`API up n running port: ${port}`)
})
