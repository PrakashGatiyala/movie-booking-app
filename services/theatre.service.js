const Theatre = require('../models/theatre.model')
const AppError = require('../errors/app.error')
const {
  createTheatreValidator,
} = require('../lib/validators/theatre.validator')

class TheatreService {
  /**
   * @function getAllTheatres
   * @returns { Promise<Theatre[]> } | list of theatres
   */
  static async getAllTheatres() {
    try {
      const theatres = await Theatre.find()
      return theatres
    } catch (error) {
      if (error instanceof AppError) {
        throw error
      }
      console.log(`Error fetching theatres`, error)
      throw new AppError('Internal server error', 500)
    }
  }

  /**
   * @function getTheatreById
   * @param {string} id
   * @returns { Promise<Theatre> } | theatre
   */
  static async getTheatreById(id) {
    try {
      const theatre = await Theatre.findById(id)
      if (!theatre) {
        throw new AppError(`Theatre not found with ${id}`, 404)
      }
      return theatre
    } catch (error) {
      if (error instanceof AppError) {
        throw error
      }
      console.log(`Error fetching theatre`, error)
      throw new AppError('Internal server error', 500)
    }
  }

  /**
   * @function createTheatre
   * @param { { name: string, plot: string, street: string, city: string, state: string, country: string, lat?: string, lon?: string, pinCode: number } } theatreData
   * @returns { Promise<Theatre> } | theatre
   */
  static async createTheatre(theatreData) {
    const safeParsedData = await createTheatreValidator.safeParseAsync(
      theatreData
    )
    if (!safeParsedData.success) {
      throw new AppError(safeParsedData.error, 400)
    }

    try {
      const theatre = await Theatre.create(safeParsedData.data)
      return theatre
    } catch (error) {
      if (error instanceof AppError) {
        throw error
      }
      console.log(`Error creating theatre`, error)
      throw new AppError('Internal server error', 500)
    }
  }

  /**
   * @function updateTheatre
   * @param {string} id
   * @param { { name: string, plot: string, street: string, city: string, state: string, country: string, lat?: string, lon?: string, pinCode: number } } theatreData
   * @returns { Promise<Theatre> } | theatre
   */
  static async updateTheatre(id, theatreData) {
    const safeParsedData = await createTheatreValidator.safeParseAsync(
      theatreData
    )
    if (!safeParsedData.success) {
      throw new AppError(safeParsedData.error, 400)
    }

    try {
      const theatre = await Theatre.findByIdAndUpdate(id, safeParsedData.data, {
        new: true,
      })
      if (!theatre) {
        throw new AppError('Theatre not found', 404)
      }
      return theatre
    } catch (error) {
      if (error instanceof AppError) {
        throw error
      }
      console.log(`Error updating theatre`, error)
      throw new AppError('Internal server error', 500)
    }
  }

  /**
   * @function deleteTheatre
   * @param {string} id
   * @returns { Promise<Theatre> } | theatre
   */
  static async deleteTheatre(id) {
    try {
      const theatre = await Theatre.findByIdAndDelete(id)
      if (!theatre) {
        throw new AppError('Theatre not found', 404)
      }
      return theatre
    } catch (error) {
      if (error instanceof AppError) {
        throw error
      }
      console.log(`Error deleting theatre`, error)
      throw new AppError('Internal server error', 500)
    }
  }
}

module.exports = TheatreService
