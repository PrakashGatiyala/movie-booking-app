const TheatreService = require('../services/theatre.service')
const AppError = require('../errors/app.error')
const {
  createTheatreValidator,
} = require('../lib/validators/theatre.validator')

async function getAllTheatres(req, res) {
  try {
    const theatres = await TheatreService.getAllTheatres()
    res.status(200).json({ status: 'success', data: { theatres } })
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

async function getTheatreById(req, res) {
  try {
    const theatre = await TheatreService.getTheatreById(req.params.id)
    res.status(200).json({ status: 'success', data: { theatre } })
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

async function createTheatre(req, res) {
  const validationResult = await createTheatreValidator.safeParseAsync(req.body)
  if (!validationResult.success) {
    return res.status(400).json({ error: validationResult.error })
  }
  const { name, plot, street, city, state, country, lat, lon, pinCode } =
    validationResult.data

  try {
    const theatre = await TheatreService.createTheatre({
      name,
      plot,
      street,
      city,
      state,
      country,
      lat,
      lon,
      pinCode,
    })

    res.status(201).json({ status: 'success', data: { theatre } })
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

async function updateTheatre(req, res) {
  const validationResult = await createTheatreValidator.safeParseAsync(req.body)
  if (!validationResult.success) {
    return res.status(400).json({ error: validationResult.error })
  }
  const { name, plot, street, city, state, country, lat, lon, pinCode } =
    validationResult.data

  try {
    const theatre = await TheatreService.updateTheatre(req.params.id, {
      name,
      plot,
      street,
      city,
      state,
      country,
      lat,
      lon,
      pinCode,
    })

    res.status(201).json({ status: 'success', data: { theatre } })
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

async function deleteTheatre(req, res) {
  try {
    const theatre = await TheatreService.deleteTheatre(req.params.id)
    res.status(200).json({ status: 'success', data: { theatre } })
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

module.exports = {
  getAllTheatres,
  getTheatreById,
  createTheatre,
  updateTheatre,
  deleteTheatre,
}
