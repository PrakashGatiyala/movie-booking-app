const TheatreHallMovieService = require('../services/theatre-hall-movie.service')
const AppError = require('../errors/app.error')
const {
  createTheatreHallMovieValidator,
} = require('../lib/validators/theatre-hall-movie.validator')

const getMovieDetailsForTheatreHall = async (req, res) => {
  try {
    const { id, movieId } = req.params
    const movieMapping =
      await TheatreHallMovieService.getMovieDetailsForTheatreHall(id, movieId)
    res.status(200).json({
      status: 'success',
      data: { movieMapping },
    })
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.code).json({ error: error.message })
    }
    console.log('Error', error)
    return res
      .status(500)
      .json({ status: 'error', error: 'Internal server error' })
  }
}

const addMovieToTheatreHall = async (req, res) => {
  const validationResult = await createTheatreHallMovieValidator.safeParseAsync(
    req.body
  )
  if (!validationResult.success) {
    return res.status(400).json({ error: validationResult.error })
  }
  const { startTimestamp, endTimestamp, price } = validationResult.data
  try {
    const { id, movieId } = req.params

    const movieMapping = await TheatreHallMovieService.addMovieToTheatreHall(
      id,
      movieId,
      { startTimestamp, endTimestamp, price }
    )
    res.status(200).json({
      status: 'success',
      data: { movieMapping },
    })
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.code).json({ error: error.message })
    }
    console.log('Error', error)
    return res
      .status(500)
      .json({ status: 'error', error: 'Internal server error' })
  }
}

module.exports = { getMovieDetailsForTheatreHall, addMovieToTheatreHall }
