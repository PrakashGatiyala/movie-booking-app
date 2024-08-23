const express = require('express')
const theatreController = require('../controllers/theatre.controller')
const movieController = require('../controllers/movie.controller')
const theatreHallController = require('../controllers/theatre-hall.controller')
const { restrictToRole } = require('../middlewares/auth.middleware')

const router = express.Router()

router.use(restrictToRole('admin'))
// Theatre
router.get('/theatres', theatreController.getAllTheatres)
router.get('/theatres/:id', theatreController.getTheatreById)
router.post('/theatres', theatreController.createTheatre)
router.patch('/theatres/:id', theatreController.updateTheatre)
router.delete('/theatres/:id', theatreController.deleteTheatre)

// Theatre Halls
router.get('/theatres/:id/halls', theatreHallController.getAllTheatreHalls)
router.post('/theatres/:id/halls/', theatreHallController.createTheatreHall)

// Movie
router.get('/movies', movieController.getAllMovies)
router.get('/movies/:id', movieController.getMovieById)
router.post('/movies', movieController.createMovie)
router.patch('/movies/:id', movieController.updateMovie)
router.delete('/movies/:id', movieController.deleteMovie)

// Theatre-hall-movie

// router.get(
//   '/theatres/:id/halls/:hallId/movies',
//   theatreHallController.getAllMoviesInHall
// )
// router.post(
//   '/theatres/:id/halls/:hallId/movies',
//   theatreHallController.addMovieToHall
// )

module.exports = router
