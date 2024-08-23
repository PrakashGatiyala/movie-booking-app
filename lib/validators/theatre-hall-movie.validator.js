const { z } = require('zod')

const createTheatreHallMovieValidator = z.object({
  startTimestamp: z.number().positive(),
  endTimestamp: z.number().positive(),
  price: z.number().positive(),
})

module.exports = {
  createTheatreHallMovieValidator,
}
