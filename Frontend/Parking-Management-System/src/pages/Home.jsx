import { Link } from 'react-router-dom'
import { Car, Shield, Clock, CreditCard } from 'lucide-react'

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-800 text-white">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">ParkSmart</h1>
          <p className="text-xl text-blue-100 mb-8">
            Smart Parking Management System
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/login" className="bg-white text-blue-700 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition">
              Login
            </Link>
            <Link to="/register" className="border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white/10 transition">
              Register
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Car, title: 'Real-time Tracking', desc: 'Monitor every parking space in real time' },
            { icon: Clock, title: 'Entry & Exit', desc: 'Fast vehicle check-in and check-out' },
            { icon: CreditCard, title: 'Payments', desc: 'Automated billing and payment collection' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center">
              <Icon className="w-12 h-12 mx-auto mb-4 text-blue-200" />
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-blue-100">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home