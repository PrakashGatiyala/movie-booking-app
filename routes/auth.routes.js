const express = require('express')
const router = express.Router()
const {
  handleUserSignup,
  handleUserSignin,
  handleUserLogout,
} = require('../controllers/auth.controller')

router.post('/signup', handleUserSignup)

router.post('/signin', handleUserSignin)

router.get('/logout', handleUserLogout)

module.exports = router
