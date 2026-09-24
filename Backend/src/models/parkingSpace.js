import mongoose from 'mongoose'

const parkingSpaceSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true }, // e.g. A1, B12
    zone: { type: String, required: true },
    status: {
      type: String,
      enum: ['available', 'occupied', 'reserved'],
      default: 'available'
    },
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vehicle',
      default: null
    },
    occupiedAt: { type: Date, default: null }
  },
  { timestamps: true }
)

export default mongoose.model('ParkingSpace', parkingSpaceSchema)