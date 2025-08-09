const jwt = require('jsonwebtoken')
require('dotenv').config()


function authmiddleware(req, res, next) {
    const authheader = req.headers['authorization'];
    const token = authheader && authheader.split(" ")[1];

    if (!token) return res.status(401).json({ message: 'No Token provided' })

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Token inValid' })
        req.user = user
        next()
    })

}

module.exports = authmiddleware