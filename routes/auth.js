'use strict'

/* AUTH ENDPOINT */

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// GET
module.exports.post = async (req, res) => {

    // Check if user exist in mongo db by username
    let user = await User.findOne({ username: req.body.username});

    // Check if sent PW match encrypted PW in db ( bcrypt.compare(reqPW, hashPW) )
    let match = await bcrypt.compare(req.body.password, user.password)

    // if match, return signed JWT
    if(match) {
        const token = jwt.sign({uid: user.uid}, process.env.PASSWORD)

        res.status(200).send({username: user.username, role: user.role, authToken: token})
    } else {
        res.status(402).send('YOU SHALL NOT PASS')
    }
    // if missmatch, return 402

}

module.exports.isAdmin = async (authtoken) => {

    // Decode JWT with process.env.SECRET
    let token = await jwt.verify(authtoken.substring(7), process.env.PASSWORD)

    // Get user from db with decoded token > uid
    let user = await User.findOne({uid: token.uid})

    // Get user role and return true / false
    if (user.role === 'admin') {
        return true;
    } else {
        return false;
    }
}

module.exports.verifyToken = async (token) => {

     console.log(token)

    try {
        // Verify JWT with process.env.SECRET, return token
        await jwt.verify(token.substring(7), process.env.PASSWORD)
        return true;

    } catch(err){
        // if error = not valid token, return 'not valid token.'
        console.error(err);
        return false;
    }
}
