'use strict'
/* USERS ENDPOINT */

let uuid = require('uuid/v4');
let User = require('../models/User');
let Auth = require('./auth'); // används denna?
const bcrypt = require('bcrypt');
const saltRounds = 8;

// POST
module.exports.post = async (req, res) => {

    // Check if req is done by admin via authToken
    try {

        let newUser = { 
            uid: uuid(),
            role: req.body.role,
            username: req.body.username,
            password: await bcrypt.hash(req.body.password, saltRounds) // encrypt pw before saving to DB
        }

        // Create user in Mongo /users
        let user = await User.create(newUser)

        // Return created user to Front End for UI confirm ( user X is created.)
        res.status(200).send(user);

    } catch (err) {
        res.status(400).send(err.stack);
    }
}