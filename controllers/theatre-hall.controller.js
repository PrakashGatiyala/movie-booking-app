const TheatreHallService = require('../services/theatre-hall.service')
const AppError = require('../errors/app.error')
const {
  theatreHallSchemaValidator,
} = require('../lib/validators/theatre-hall.validator')

async function getAllTheatreHalls(req, res) {
  try {
    const theatreHalls = await TheatreHallService.getAllTheatreHalls(
      req.params.id
    )
    res.status(200).json({ status: 'success', data: { theatreHalls } })
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.code).json({ error: error.message })
    }
    console.log(`Error`, error)
    return res
      .status(500)
      .json({ status: 'error', error: 'Internal server error' })
  }
}

async function createTheatreHall(req, res) {
  const validationResult = await theatreHallSchemaValidator.safeParseAsync(
    req.body
  )
  if (!validationResult.success) {
    return res.status(400).json({ error: validationResult.error })
  }
  const { number, seatingCapacity } = validationResult.data
  try {
    const theatreHall = await TheatreHallService.createTheatreHall(
      req.params.id,
      { number, seatingCapacity }
    )
    res.status(201).json({ status: 'success', data: { theatreHall } })
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.code).json({ error: error.message })
    }
    console.log(`Error`, error)
    return res
      .status(500)
      .json({ status: 'error', error: 'Internal server error' })
  }
}

module.exports = { getAllTheatreHalls, createTheatreHall }
