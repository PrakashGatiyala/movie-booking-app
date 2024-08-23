const TheatreHallMovieMapping = require('../models/theatre-hall-movie-mapping.model')
const TheatreHall = require('../models/theatre-halls.model')
const Movie = require('../models/movies.model')
const AppError = require('../errors/app.error')
const {
  createTheatreHallMovieValidator,
} = require('../lib/validators/theatre-hall-movie.validator')

class TheatreHallMovieService {
  /**
   * @function getMovieDetailsForTheatreHall
   * @param {string} theatreHallId
   * @param {string} movieId
   * @returns {Promise<TheatreHallMovieMapping>} | Movie details for the theatre hall
   */
  static async getMovieDetailsForTheatreHall(theatreHallId, movieId) {
    try {
      const theatreHall = await TheatreHall.findById(theatreHallId)
      if (!theatreHall) {
        throw new AppError('Theatre Hall not found', 404)
      }
      const movie = await Movie.findById(movieId)
      if (!movie) {
        throw new AppError('Movie not found', 404)
      }

      const movieMapping = await TheatreHallMovieMapping.findOne({
        theatreHallId,
        movieId,
      })

      if (!movieMapping) {
        throw new AppError('Movie not found in the theatre hall', 404)
      }
      return movieMapping
    } catch (error) {
      if (error instanceof AppError) {
        throw error
      }
      console.log('Error fetching movie details for theatre hall', error)
      throw new AppError('Internal server error', 500)
    }
  }

  /**
   * @function addMovieToTheatreHall
   * @param {string} theatreHallId
   * @param {string} movieId
   * @param { { startTimestamp: number, endTimestamp: number, price: number } } movieDetailsOfHall
   * @returns { Promise<TheatreHallMovieMapping> } | Movie mapping for the theatre hall
   */
  static async addMovieToTheatreHall(
    theatreHallId,
    movieId,
    movieDetailsOfHall
  ) {
    const safeParsedData = await createTheatreHallMovieValidator.safeParseAsync(
      movieDetailsOfHall
    )
    if (!safeParsedData.success) {
      throw new AppError(safeParsedData.error, 400)
    }
    const { startTimestamp, endTimestamp, price } = safeParsedData.data
    try {
      const theatreHall = await TheatreHall.findById(theatreHallId)
      if (!theatreHall) {
        throw new AppError('Theatre Hall not found', 404)
      }
      const movie = await Movie.findById(movieId)
      if (!movie) {
        throw new AppError('Movie not found', 404)
      }

      const movieMapping = await TheatreHallMovieMapping.create({
        theatreHallId,
        movieId,
        startTimestamp,
        endTimestamp,
        price,
      })
      return movieMapping
    } catch (error) {
      if (error instanceof AppError) {
        throw error
      }
      console.log('Error adding movie to theatre hall', error)
      throw new AppError('Internal server error', 500)
    }
  }
}

module.exports = TheatreHallMovieService
