import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import ProtectedRoute from './routes/ProtectedRoute'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import ParkingSpaces from './pages/ParkingSpaces'
import VehicleEntry from './pages/VehicleEntry'
import VehicleExit from './pages/VehicleExit'
import Payments from './pages/Payments'
import Reports from './pages/Reports'

function App() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen">
      {user && <Navbar />}
      <div className="flex">
        {user && <Sidebar />}
        <main className={`flex-1 ${user ? 'ml-64 pt-16' : ''}`}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
            <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/parking-spaces" element={<ParkingSpaces />} />
              <Route path="/vehicle-entry" element={<VehicleEntry />} />
              <Route path="/vehicle-exit" element={<VehicleExit />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/reports" element={<Reports />} />
            </Route>

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App