import mongoose from 'mongoose'

const vehicleSchema = new mongoose.Schema(
  {
    plate: { type: String, required: true, uppercase: true },
    owner: { type: String, required: true },
    vehicleType: {
      type: String,
      enum: ['car', 'suv', 'motorcycle', 'truck'],
      default: 'car'
    },
    space: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ParkingSpace',
      required: true
    },
    spaceId: { type: String, required: true }, // human readable e.g. A5
    entryTime: { type: Date, default: Date.now },
    exitTime: { type: Date, default: null },
    hours: { type: Number, default: 0 },
    amount: { type: Number, default: 0 },
    paid: { type: Boolean, default: false }
  },
  { timestamps: true }
)

export default mongoose.model('Vehicle', vehicleSchema)