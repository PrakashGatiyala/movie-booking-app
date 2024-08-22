const { z } = require('zod')

const createTheatreValidator = z.object({
  name: z.string().min(2).max(50),
  plot: z.string(),
  street: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  lat: z.string().optional(),
  lon: z.string().optional(),
  pinCode: z.number(),
})

module.exports = { createTheatreValidator }
