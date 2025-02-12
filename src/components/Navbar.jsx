import { Link, useLocation } from 'react-router-dom'
import { ConnectButton } from '@rainbow-me/rainbowkit'

export function Navbar() {
  const location = useLocation()

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
                          className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#FF4B4B] to-[#FF2D2D] text-white text-sm font-medium hover:shadow-[0_0_30px_rgba(255,75,75,0.3)] transition-all duration-300"
                        >
                          Connect Wallet
                        </button>
                      )
                    }

                    return (
                      <div className="flex items-center gap-3">
                        <button
                          onClick={openChainModal}
                          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-[#FF4B4B]/20 text-white text-sm"
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
                          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-[#FF4B4B]/20"
                        >
                          <span className="w-2 h-2 rounded-full bg-[#FF4B4B]"></span>
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