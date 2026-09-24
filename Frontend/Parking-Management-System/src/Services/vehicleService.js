import api from './api'

export const vehicleService = {
  getAll: async () => {
    const { data } = await api.get('/vehicles')
    return data
  },

  getActive: async () => {
    const { data } = await api.get('/vehicles/active')
    return data
  },

  entry: async ({ plate, owner, vehicleType, spaceId }) => {
    const { data } = await api.post('/vehicles/entry', {
      plate,
      owner,
      vehicleType,
      spaceId
    })
    return data
  },

  exit: async (vehicleId) => {
    const { data } = await api.put(`/vehicles/${vehicleId}/exit`)
    return data
  },

  markPaid: async (vehicleId) => {
    const { data } = await api.put(`/vehicles/${vehicleId}/pay`)
    return data
  }
}