import { Link, useLocation } from 'react-router-dom'
import { useWallet } from '../hooks/useWallet'

export function Navbar() {
  const location = useLocation()
  const { isConnected, connect, account } = useWallet()

  return (
    <nav className="relative z-10 border-b border-[#FF4B4B]/20 backdrop-blur-xl bg-black/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo and Navigation */}
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-white font-bold text-2xl flex items-center gap-2">
              <span className="text-[#FF4B4B] text-3xl">🌐</span>
              Language AI
            </Link>
            <div className="hidden md:flex items-center space-x-2">
              <Link
                to="/"
                className={`px-5 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                  location.pathname === '/' 
                    ? 'bg-gradient-to-r from-[#FF4B4B] to-[#FF2D2D] text-white' 
                    : 'text-gray-300 hover:bg-[#FF4B4B]/10 hover:text-white'
                }`}
              >
                Home
              </Link>
              <Link
                to="/upload"
                className={`px-5 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                  location.pathname === '/upload' 
                    ? 'bg-gradient-to-r from-[#FF4B4B] to-[#FF2D2D] text-white' 
                    : 'text-gray-300 hover:bg-[#FF4B4B]/10 hover:text-white'
                }`}
              >
                Upload
              </Link>
              <Link
                to="/copyright"
                className={`px-5 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                  location.pathname === '/copyright' 
                    ? 'bg-gradient-to-r from-[#FF4B4B] to-[#FF2D2D] text-white' 
                    : 'text-gray-300 hover:bg-[#FF4B4B]/10 hover:text-white'
                }`}
              >
                Copyright
              </Link>
            </div>
          </div>

          {/* Wallet Connection */}
          {!isConnected ? (
            <button
              onClick={connect}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#FF4B4B] to-[#FF2D2D] text-white text-sm font-medium hover:shadow-[0_0_30px_rgba(255,75,75,0.3)] transition-all duration-300"
            >
              Connect Wallet
            </button>
          ) : (
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-[#FF4B4B]/20">
              <span className="w-2 h-2 rounded-full bg-[#FF4B4B]"></span>
              <span className="text-white/80 text-sm">
                {account.slice(0, 6)}...{account.slice(-4)}
              </span>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
} 