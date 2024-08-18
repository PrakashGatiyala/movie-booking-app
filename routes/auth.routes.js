const express = require('express')
const router = express.Router()
const {
  handleUserSignup,
  handleUserSignin,
  handleMe,
  handleUserLogout,
} = require('../controllers/auth.controller')

router.post('/sign-up', handleUserSignup)

router.post('/sign-in', handleUserSignin)

router.get('/me', handleMe)

router.get('/logout', handleUserLogout)

module.exports = router
