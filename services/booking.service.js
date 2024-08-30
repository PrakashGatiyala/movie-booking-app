const {
  createBookingValidator,
  verifyBookingPaymentValidator,
} = require('../lib/validators/booking.validator')
const Booking = require('../models/booking.model')
const AppError = require('../errors/app.error')
const TheatreHallMovieMapping = require('../models/theatre-hall-movie-mapping.model')
const TheatreHall = require('../models/theatre-halls.model')
const { hash } = require('../utils/hash')
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
        notes: {
          userId,
          showId,
          seatNumber,
        },
      }
      const order = await razorpay.orders.create(options)
      return order
    } catch (error) {
      if (error instanceof AppError) {
        throw error
      }
      console.log(`Error creating order for Booking`, error)
      throw new AppError('Internal server error', 500)
    }
  }

  static async verifyBookingPayment(paymentData) {
    const safeParsedData = await verifyBookingPaymentValidator.safeParseAsync(
      paymentData
    )
    if (!safeParsedData.success) {
      throw new AppError(safeParsedData.error, 400)
    }
    const { paymentId, orderId, signature } = safeParsedData.data
    const RAZORPAY_API_SECRET = process.env.RAZORPAY_API_SECRET
    const expectedSignature = hash(
      `${orderId}|${paymentId}`,
      RAZORPAY_API_SECRET,
      'sha256'
    )
    if (signature !== expectedSignature) {
      throw new AppError('Invalid signature', 400)
    }
    const paymentInfo = await razorpay.payments.fetch(paymentId)
    const { status, notes } = paymentInfo
    if (status !== 'captured') {
      throw new AppError(`Payment not captured`, 400)
    }
    const { userId, showId, seatNumber } = notes
    try {
      const booking = await Booking.create({
        userId,
        showId,
        seatNumber,
        paymentId,
        geteway: 'RAZORPAY',
      })
      return booking
    } catch (error) {
      // Refund the payment if booking creation fails
      // await razorpay.payments.refund(paymentId, {
      //   amount: paymentInfo.amount,
      //   speed: 'normal'
      // })
      if (error instanceof AppError) {
        throw error
      }
      console.log(`Error verifing Payment for booking`, error)
      throw new AppError('Internal server error', 500)
    }
  }
}

module.exports = BookingService
