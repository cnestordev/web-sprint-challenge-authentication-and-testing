/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

module.exports = (req, res, next) => {
  if (req.session.username) {
    next()
  } else {
    res.status(401).json({ message: 'you are not authorized to view this page' })
  }
}

/*
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
