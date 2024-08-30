const {
  createBookingValidator,
} = require('../lib/validators/booking.validator')
const Booking = require('../models/booking.model')
const AppError = require('../errors/app.error')
const TheatreHallMovieMapping = require('../models/theatre-hall-movie-mapping.model')
const TheatreHall = require('../models/theatre-halls.model')
const Razorpay = require('razorpay')

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
})

class BookingService {
  static async createBooking(userId, bookingData) {
    const safeParsedData = await createBookingValidator.safeParseAsync(
      bookingData
    )
    if (!safeParsedData.success) {
      throw new AppError(safeParsedData.error, 400)
    }

    try {
      const { showId, seatNumber } = safeParsedData.data
      const show = await TheatreHallMovieMapping.findById(showId)
      if (!show) {
        throw new AppError(`Show not found with id ${showId}`, 404)
      }
      const theatreHall = await TheatreHall.findById(show.theatreHallId)
      if (!theatreHall) {
        throw new AppError(
          `Theatre hall not found with id ${show.theatreHallId}`,
          404
        )
      }

      const currentTime = new Date().getTime()
      if (currentTime > show.startTimestamp) {
        throw new AppError(`Show already started`, 400)
      }

      if (seatNumber > theatreHall.seatingCapacity) {
        throw new AppError(
          `Seat number ${seatNumber} is invalid for theatre hall ${theatreHall._id}`,
          400
        )
      }

      const bookingExists = await Booking.findOne({ showId, seatNumber })
      if (bookingExists) {
        throw new AppError(
          `Seat number ${seatNumber} is already booked for show ${showId}`,
          400
        )
      }

      // Razorpay Order creation logic goes here
      const amount = show.price * 100
      const options = {
        amount,
        currency: 'INR',
        receipt: `booking-${showId}-${seatNumber}`,
      }
      const order = await razorpay.orders.create(options)
      return order
    } catch (error) {
      if (error instanceof AppError) {
        throw error
      }
      console.log(`Error creating booking`, error)
      throw new AppError('Internal server error', 500)
    }
  }
}

module.exports = BookingService
