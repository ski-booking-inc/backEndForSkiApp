let auth = require('./auth');
// Items
module.exports.get = async (req, res) => {
    console.log('Funkar, du är Authorizerad')

    //ring mongo, hämta items
    if (await auth.isAdmin(req.headers.authorization)) {
        // hämta akutell data från mongoDB
        res.status(200).send(['prod1', 'prod2']); // Här är mongologiken.
    } else {
        res.status(403).send('nooooooo')
    }
}

// jobba vidare