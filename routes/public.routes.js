const express = require('express')
const theatreController = require('../controllers/theatre.controller')
const movieController = require('../controllers/movie.controller')
const theatreHallController = require('../controllers/theatre-hall.controller')
const theatreHallMovieController = require('../controllers/theatre-hall-movie.controller')

const router = express.Router()

// Movie
router.get('/movies', movieController.getAllMovies)

//  Theatre-hall-movie mapping
router.get('/shows/movie/:movieId', theatreHallMovieController.getShowsForMovie)

// Theatre Halls
router.get('/theatre-hall/:id', theatreHallController.getTheatreHallById)

//  Theatre
router.get('/theatres', theatreController.getAllTheatres)

module.exports = router
