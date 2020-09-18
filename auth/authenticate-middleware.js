const jwt = require('jsonwebtoken')

/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

module.exports = (req, res, next) => {
  const token = req.headers.authorization
  const secret = process.env.JWT_SECRET || "thisisasecret"

  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (!err) {
        req.jwt = decodedToken
        next()
      } else {
        res.status(403).json({ message: 'Not Authorized' })
      }
    })
  } else {
    res.status(403).json({ message: 'Not Authorized' })
  }
}

/*
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
