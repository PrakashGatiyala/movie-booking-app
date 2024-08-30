const express = require('express')
const router = express.Router()
const { restrictToRole } = require('../middlewares/auth.middleware')
const bookingController = require('../controllers/booking.controller')

router.use(restrictToRole('user'))

router.post('/create', bookingController.handleCreateBooking)

module.exports = router
