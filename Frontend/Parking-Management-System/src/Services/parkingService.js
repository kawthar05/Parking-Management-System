import api from './api'

export const parkingService = {
  getAll: async () => {
    const { data } = await api.get('/parking')
    return data
  },

  getAvailable: async () => {
    const { data } = await api.get('/parking/available')
    return data
  },

  getStats: async () => {
    const { data } = await api.get('/parking/stats')
    return data
  },

  occupy: async (spaceId, vehicleId) => {
    const { data } = await api.put(`/parking/${spaceId}/occupy`, { vehicleId })
    return data
  },

  free: async (spaceId) => {
    const { data } = await api.put(`/parking/${spaceId}/free`)
    return data
  }
}