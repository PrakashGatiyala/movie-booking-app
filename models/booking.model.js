const { Schema, model } = require('mongoose')

const bookingSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    showId: {
      type: Schema.Types.ObjectId,
      ref: 'TheatreHallMovieMapping',
      required: true,
    },
    seatNumber: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

bookingSchema.index({ showId: 1, seatNumber: 1 }, { unique: true })

const Booking = model('booking', bookingSchema)

module.exports = Booking
