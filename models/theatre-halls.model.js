const { Schema, model } = require('mongoose')

const theatreHallSchema = new Schema(
  {
    number: {
      type: Number,
      required: true,
      min: 0,
    },
    seatingCapacity: {
      type: Number,
      required: true,
      min: 1,
    },
    theatreId: {
      type: Schema.Types.ObjectId,
      ref: 'theatre',
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

theatreHallSchema.index({ number: 1, theatreId: 1 }, { unique: true })

const TheatreHall = model('theatreHall', theatreHallSchema)

module.exports = TheatreHall
