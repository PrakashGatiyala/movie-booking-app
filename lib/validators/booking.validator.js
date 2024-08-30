const { z } = require('zod')

const createBookingValidator = z.object({
  showId: z.string(),
  seatNumber: z.number().int().min(1),
})

module.exports = { createBookingValidator }
