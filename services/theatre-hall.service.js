const TheatreHall = require('../models/theatre-halls.model')
const Theatre = require('../models/theatre.model')
const AppError = require('../errors/app.error')
const {
  theatreHallSchemaValidator,
} = require('../lib/validators/theatre-hall.validator')

class TheatreHallService {
  /**
   * @function getAllTheatreHalls
   * @param {string} theatreId
   * @returns { Promise<TheatreHall[]> } | List of theatre halls
   */
  static async getAllTheatreHalls(theatreId) {
    try {
      const theatreHalls = await TheatreHall.find({ theatreId })
      if (!theatreHalls) {
        throw new AppError(`Theatre halls not found with ${theatreId}`, 404)
      }
      return theatreHalls
    } catch (error) {
      if (error instanceof AppError) {
        throw error // Rethrow the original CustomError
      }
      console.log(`Error fetching theatre halls`, error)
      throw new AppError('Internal server error', 500)
    }
  }

  /**
   * @function createTheatreHall
   * @param {string} theatreId
   * @param { { number: number, seatingCapacity: number  }} theatreHallData
   * @returns { Promise<TheatreHall> } | Created theatre hall
   */
  static async createTheatreHall(theatreId, theatreHallData) {
    const safeParsedData = await theatreHallSchemaValidator.safeParseAsync(
      theatreHallData
    )
    if (!safeParsedData.success) {
      throw new AppError(safeParsedData.error, 400)
    }
    try {
      const theatre = await Theatre.findById(theatreId)
      if (!theatre) {
        throw new AppError(`Theatre not found with id ${theatreId}`, 404)
      }

      const theatreHallExists = await TheatreHall.findOne({
        number: safeParsedData.data.number,
        theatreId: theatreId,
      })
      if (theatreHallExists) {
        throw new AppError(
          `Theatre hall with number ${safeParsedData.data.number} already exists`,
          400
        )
      }

      const theatreHall = await TheatreHall.create({
        ...safeParsedData.data,
        theatreId,
      })
      return theatreHall
    } catch (error) {
      if (error instanceof AppError) {
        throw error // Rethrow the original CustomError
      }
      console.log(`Error creating theatre hall`, error)
      throw new AppError('Internal server error', 500)
    }
  }
}

module.exports = TheatreHallService
