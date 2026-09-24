import api from './api'

export const paymentService = {
  getAll: async () => {
    const { data } = await api.get('/payments')
    return data
  },

  create: async ({ vehicleId, plate, amount, method = 'cash' }) => {
    const { data } = await api.post('/payments', {
      vehicleId,
      plate,
      amount,
      method
    })
    return data
  },

  getStats: async () => {
    const { data } = await api.get('/payments/stats')
    return data
  }
}