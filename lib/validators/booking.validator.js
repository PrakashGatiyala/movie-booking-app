const { z } = require('zod')

const createBookingValidator = z.object({
  showId: z.string(),
  seatNumber: z.number().int().min(1),
})

const verifyBookingPaymentValidator = z.object({
  paymentId: z.string(),
  orderId: z.string(),
  signature: z.string(),
})

module.exports = { createBookingValidator, verifyBookingPaymentValidator }
