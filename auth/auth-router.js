const router = require('express').Router();
const { addUser, findUser } = require('./auth-model')
const validateUser = require('./authenticate-middleware')

const bcrypt = require('bcryptjs')

router.post('/register', (req, res) => {

  req.body.password = bcrypt.hashSync(req.body.password, 4)

  addUser(req.body)
    .then(([id]) => {
      res.status(201).json({ message: 'Your account was successfully created.' })
    })
    .catch(err => {
      res.status(401).json({ message: 'That username has already been taken.' })
    })
});

router.post('/login', (req, res) => {
  findUser(req.body.username)
    .then(user => {
      if (user && bcrypt.compareSync(req.body.password, user.password)) {
        req.session.username = user.username
        res.status(201).json({ message: 'You are now logged in' })
      } else {
        res.status(404).json({ message: 'invalid credentials' })
      }
    })
    .catch(error => {
      res.status(500).json({ message: error.message })
    })
});



module.exports = router;
