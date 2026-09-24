import { useAuth } from '../context/AuthContext'
import { LogOut, Car } from 'lucide-react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const { user, logout } = useAuth()

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50 flex items-center justify-between px-6">
      <Link to="/dashboard" className="flex items-center gap-2 font-bold text-xl text-blue-700">
        <Car className="w-7 h-7" />
        ParkSmart
      </Link>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">
          {user?.name} <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full ml-1">{user?.role}</span>
        </span>
        <button
          onClick={logout}
          className="flex items-center gap-1.5 text-sm text-red-600 hover:text-red-700 font-medium"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </header>
  )
}

export default Navbar