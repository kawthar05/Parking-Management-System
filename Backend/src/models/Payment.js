import mongoose from 'mongoose'

const paymentSchema = new mongoose.Schema(
  {
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vehicle',
      required: true
    },
    plate: { type: String, required: true },
    amount: { type: Number, required: true },
    method: {
      type: String,
      enum: ['cash', 'card', 'transfer', 'pos'],
      default: 'cash'
    },
    status: {
      type: String,
      enum: ['completed', 'pending', 'failed'],
      default: 'completed'
    },
    date: { type: Date, default: Date.now }
  },
  { timestamps: true }
)

export default mongoose.model('Payment', paymentSchema)