import { Link, useLocation } from 'react-router-dom'
import { ConnectButton } from '@rainbow-me/rainbowkit'

export function Navbar() {
  const location = useLocation()

  return (
    <nav className="relative z-10 border-b border-[#FF4B4B]/10 backdrop-blur-xl bg-black/30 shadow-[0_4px_30px_rgba(255,75,75,0.05)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo and Navigation */}
          <div className="flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-white font-bold text-2xl flex items-center gap-2 hover:scale-[1.02] transition-all duration-300"
            >
              <img 
                src="https://pbs.twimg.com/profile_images/1873839225914716160/w8650_qp_400x400.jpg"
                alt="Sei Logo" 
                className="w-8 h-8 rounded-full filter drop-shadow-[0_0_8px_rgba(255,75,75,0.3)]"
              />
              AI
            </Link>
            <div className="hidden md:flex items-center space-x-2">
              <Link
                to="/upload"
                className={`relative px-5 py-3 rounded-lg text-base font-medium transition-all duration-300 hover:scale-[1.02] ${
                  location.pathname === '/upload' 
                    ? 'text-white' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Upload
                {/* Active indicator line */}
                {location.pathname === '/upload' && (
                  <div className="absolute bottom-1 left-5 right-5 h-0.5 bg-gradient-to-r from-[#FF4B4B] to-[#FF2D2D] rounded-full"></div>
                )}
              </Link>
              <Link
                to="/copyright"
                className={`relative px-5 py-3 rounded-lg text-base font-medium transition-all duration-300 hover:scale-[1.02] ${
                  location.pathname === '/copyright' 
                    ? 'text-white' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Copyright
                {/* Active indicator line */}
                {location.pathname === '/copyright' && (
                  <div className="absolute bottom-1 left-5 right-5 h-0.5 bg-gradient-to-r from-[#FF4B4B] to-[#FF2D2D] rounded-full"></div>
                )}
              </Link>
              <Link
                to="/exchange"
                className={`relative px-5 py-3 rounded-lg text-base font-medium transition-all duration-300 hover:scale-[1.02] ${
                  location.pathname === '/exchange' 
                    ? 'text-white' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Buy/Sell
                {location.pathname === '/exchange' && (
                  <div className="absolute bottom-1 left-5 right-5 h-0.5 bg-gradient-to-r from-[#FF4B4B] to-[#FF2D2D] rounded-full"></div>
                )}
              </Link>
              <Link
                to="/swap"
                className={`relative px-5 py-3 rounded-lg text-base font-medium transition-all duration-300 hover:scale-[1.02] ${
                  location.pathname === '/swap' 
                    ? 'text-white' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Swap
                {location.pathname === '/swap' && (
                  <div className="absolute bottom-1 left-5 right-5 h-0.5 bg-gradient-to-r from-[#FF4B4B] to-[#FF2D2D] rounded-full"></div>
                )}
              </Link>
            </div>
          </div>

          {/* RainbowKit Connect Button */}
          <ConnectButton.Custom>
            {({
              account,
              chain,
              openAccountModal,
              openChainModal,
              openConnectModal,
              mounted,
            }) => {
              const ready = mounted
              const connected = ready && account && chain

              return (
                <div
                  {...(!ready && {
                    'aria-hidden': true,
                    style: {
                      opacity: 0,
                      pointerEvents: 'none',
                      userSelect: 'none',
                    },
                  })}
                >
                  {(() => {
                    if (!connected) {
                      return (
                        <button
                          onClick={openConnectModal}
                          className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#FF4B4B]/90 to-[#FF2D2D]/90 text-white text-sm font-medium hover:shadow-[0_0_20px_rgba(255,75,75,0.2)] hover:scale-[1.02] transition-all duration-300 border border-[#FF4B4B]/10"
                        >
                          Connect Wallet
                        </button>
                      )
                    }

                    return (
                      <div className="flex items-center gap-3">
                        <button
                          onClick={openChainModal}
                          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-[#FF4B4B]/10 text-white text-sm hover:bg-white/5 hover:shadow-[0_0_15px_rgba(255,75,75,0.1)] transition-all duration-300"
                        >
                          {chain.hasIcon && (
                            <div style={{ background: chain.iconBackground }} className="w-4 h-4 rounded-full overflow-hidden">
                              {chain.iconUrl && (
                                <img
                                  alt={chain.name ?? 'Chain icon'}
                                  src={chain.iconUrl}
                                  className="w-4 h-4"
                                />
                              )}
                            </div>
                          )}
                          {chain.name}
                        </button>

                        <button
                          onClick={openAccountModal}
                          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-[#FF4B4B]/10 hover:shadow-[0_0_15px_rgba(255,75,75,0.1)] transition-all duration-300"
                        >
                          <span className="w-2 h-2 rounded-full bg-[#FF4B4B]/80"></span>
                          <span className="text-white/80 text-sm">
                            {account.displayName}
                          </span>
                        </button>
                      </div>
                    )
                  })()}
                </div>
              )
            }}
          </ConnectButton.Custom>
        </div>
      </div>
    </nav>
  )
} 