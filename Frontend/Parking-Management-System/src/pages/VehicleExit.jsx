const handlePay = async (vehicle) => {
  try {
    await paymentService.create({
      vehicleId: vehicle._id,   // ← use _id from MongoDB
      plate: vehicle.plate,
      amount: vehicle.amount,
      method: 'cash'
    })
    // No need to call markPaid separately — the backend already does it
    setMessage(`Payment of ₦${vehicle.amount} collected for ${vehicle.plate}`)
    setSelected(null)
    load()
  } catch (err) {
    alert(err.response?.data?.message || err.message)
  }
}

export default handlePay