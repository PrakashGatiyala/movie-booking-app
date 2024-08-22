const Movie = require('../models/movies.model')
const AppError = require('../errors/app.error')
const { createMovieValidator } = require('../lib/validators/movie.validator')

class MovieService {
  /**
   * @function getAllMovies
   * @returns { Promise<Movie[]>} | list of movies
   */
  static async getAllMovies() {
    try {
      const movies = await Movie.find()
      return movies
    } catch (error) {
      console.log(`Error fetching movies`, error)
      throw new AppError('Internal server error', 500)
    }
  }

  /**
   * @function getMovieById
   * @param {string} id
   * @returns { Promise<Movie> } | A movie object
   */
  static async getMovieById(id) {
    try {
      const movie = await Movie.findById(id)
      if (!movie) {
        throw new AppError('Movie not found', 404)
      }
      return movie
    } catch (error) {
      console.log(`Error fetching movie`, error)
      throw new AppError('Internal server error', 500)
    }
  }

  /**
   * @function createMovie
   * @param {{ title: string, description?: string, language?: string, imageURL?: string, durationInMinutes?: number }} movieData
   * @returns { Promise<Movie> } | A movie object
   */
  static async createMovie(movieData) {
    const safeParsedData = await createMovieValidator.safeParseAsync(movieData)
    if (!safeParsedData.success) {
      throw new AppError(safeParsedData.error, 400)
    }

    try {
      const movie = await Movie.create(safeParsedData.data)
      return movie
    } catch (error) {
      console.log(`Error creating movie`, error)
      throw new AppError('Internal server error', 500)
    }
  }

  /**
   * @function updateMovie
   * @param {string} id
   * @param {{ title: string, description?: string, language?: string, imageURL?: string, durationInMinutes?: number }} movieData
   * @returns { Promise<Movie> } | A updated movie object
   */
  static async updateMovie(id, movieData) {
    const safeParsedData = await createMovieValidator.safeParseAsync(movieData)
    if (!safeParsedData.success) {
      throw new AppError(safeParsedData.error, 400)
    }

    try {
      const movie = await Movie.findByIdAndUpdate(id, safeParsedData.data, {
        new: true,
      })
      if (!movie) {
        throw new AppError('Movie Not found for Update', 404)
      }
      return movie
    } catch (error) {
      console.log(`Error updating movie`, error)
      throw new AppError('Internal server error', 500)
    }
  }

  /**
   * @function deleteMovie
   * @param {string} id
   * @returns { Promise<Movie> } | A deleted movie Object
   */
  static async deleteMovie(id) {
    try {
      const movie = await Movie.findByIdAndDelete(id)
      if (!movie) {
        throw new AppError('Movie Not found for delation', 404)
      }
      return movie
    } catch (error) {
      console.log(`Error deleting movie`, error)
      throw new AppError('Internal server error', 500)
    }
  }
}

module.exports = MovieService
