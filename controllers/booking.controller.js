const {
  createBookingValidator,
  verifyBookingPaymentValidator,
} = require('../lib/validators/booking.validator')
const AppError = require('../errors/app.error')
const BookingService = require('../services/booking.service')
const { hash } = require('../utils/hash')

async function handleCreateBooking(req, res) {
  const validationResult = await createBookingValidator.safeParseAsync(req.body)
  if (!validationResult.success) {
    return res.status(400).json({ error: validationResult.error })
  }
  const { showId, seatNumber } = validationResult.data

  const userId = req.user.id

  try {
    const order = await BookingService.createBooking(userId, {
      showId,
      seatNumber,
    })
    return res.status(201).json({ status: 'success', data: { order } })
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.code).json({ error: error.message })
    }
    console.log(`Error`, error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

async function handleVerifyBookingPayment(req, res) {
  const validationResult = await verifyBookingPaymentValidator.safeParseAsync(
    req.body
  )
  if (!validationResult.success) {
    return res.status(400).json({ error: validationResult.error })
  }
  const { paymentId, orderId, signature } = validationResult.data
  const RAZORPAY_API_SECRET = process.env.RAZORPAY_API_SECRET
  const expectedSignature = hash(
    `${orderId}|${paymentId}`,
    RAZORPAY_API_SECRET,
    'sha256'
  )
  if (signature !== expectedSignature) {
    return res.status(400).json({ error: 'Invalid signature' })
  }

  try {
    const booking = await BookingService.verifyBookingPayment({
      paymentId,
      orderId,
      signature,
    })
    return res.status(200).json({ status: 'success', data: { booking } })
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.code).json({ error: error.message })
    }
    console.log(`Error`, error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

module.exports = { handleCreateBooking, handleVerifyBookingPayment }
