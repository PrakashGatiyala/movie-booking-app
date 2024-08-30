const {
  createBookingValidator,
} = require('../lib/validators/booking.validator')
const AppError = require('../errors/app.error')
const BookingService = require('../services/booking.service')

async function handleCreateBooking(req, res) {
  const validationResult = await createBookingValidator.safeParseAsync(req.body)
  if (!validationResult.success) {
    return res.status(400).json({ error: validationResult.error })
  }
  const { showId, seatNumber } = validationResult.data

  const userId = req.user.id

  try {
    const booking = await BookingService.createBooking(userId, {
      showId,
      seatNumber,
    })
    return res.status(201).json({ status: 'success', data: { booking } })
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.code).json({ error: error.message })
    }
    console.log(`Error`, error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

module.exports = { handleCreateBooking }
