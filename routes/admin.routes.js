const express = require('express')
const theatreController = require('../controllers/theatre.controller')
const movieController = require('../controllers/movie.controller')
const theatreHallController = require('../controllers/theatre-hall.controller')
const theatreHallMovieController = require('../controllers/theatre-hall-movie.controller')
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

// Theatre-hall-movie mapping
router.get('/shows/movie/:movieId', theatreHallMovieController.getShowsForMovie) // TODO: make this route public
router.get(
  '/shows/theatre-hall/:theatreHallId',
  theatreHallMovieController.getShowsForTheatreHall
)
router.post('/shows', theatreHallMovieController.createShow)
router.get(
  '/theatre-hall/:id/movies/:movieId',
  theatreHallMovieController.getMovieDetailsForTheatreHall
)
router.post(
  '/theatre-hall/:id/movies/:movieId',
  theatreHallMovieController.addMovieToTheatreHall
)

module.exports = router
