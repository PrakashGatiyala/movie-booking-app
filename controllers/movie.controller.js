const MovieService = require('../services/movie.service')
const AppError = require('../errors/app.error')
const { createMovieValidator } = require('../lib/validators/movie.validator')

async function getAllMovies(req, res) {
  try {
    const movies = await MovieService.getAllMovies()
    res.status(200).json({ status: 'success', data: { movies } })
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

async function getMovieById(req, res) {
  try {
    const movie = await MovieService.getMovieById(req.params.id)
    res.status(200).json({ status: 'success', data: { movie } })
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

async function createMovie(req, res) {
  const validationResult = await createMovieValidator.safeParseAsync(req.body)
  if (!validationResult.success) {
    return res.status(400).json({ error: validationResult.error })
  }
  const { title, description, language, imageURL, durationInMinutes } =
    validationResult.data

  try {
    const movie = await MovieService.createMovie({
      title,
      description,
      language,
      imageURL,
      durationInMinutes,
    })
    res.status(201).json({ status: 'success', data: { movie } })
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

async function updateMovie(req, res) {
  const validationResult = await createMovieValidator.safeParseAsync(req.body)
  if (!validationResult.success) {
    return res.status(400).json({ error: validationResult.error })
  }
  const { title, description, language, imageURL, durationInMinutes } =
    validationResult.data

  try {
    const movie = await MovieService.updateMovie(req.params.id, {
      title,
      description,
      language,
      imageURL,
      durationInMinutes,
    })
    return res.status(201).json({ status: 'success', data: { movie } })
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

async function deleteMovie(req, res) {
  try {
    const movie = await MovieService.deleteMovie(req.params.id)
    res.status(200).json({ status: 'success', data: { movie } })
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
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
}
