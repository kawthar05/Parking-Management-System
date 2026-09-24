import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  ParkingSquare,
  LogIn,
  LogOut,
  CreditCard,
  BarChart3
} from 'lucide-react'

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/parking-spaces', label: 'Parking Spaces', icon: ParkingSquare },
  { to: '/vehicle-entry', label: 'Vehicle Entry', icon: LogIn },
  { to: '/vehicle-exit', label: 'Vehicle Exit', icon: LogOut },
  { to: '/payments', label: 'Payments', icon: CreditCard },
  { to: '/reports', label: 'Reports', icon: BarChart3 },
]

const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 bg-white border-r border-gray-200 p-4 overflow-y-auto">
      <nav className="space-y-1">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            <Icon className="w-5 h-5" />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar