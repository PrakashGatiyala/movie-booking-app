const { z } = require('zod')

const theatreHallSchemaValidator = z.object({
  number: z.number().min(0),
  seatingCapacity: z.number().min(1),
})

module.exports = { theatreHallSchemaValidator }
