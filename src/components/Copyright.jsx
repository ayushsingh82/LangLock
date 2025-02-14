import { useState } from 'react'
import { useWallet } from '../hooks/useWallet'
import { Navbar } from './Navbar'

export function Copyright() {
  const [searchQuery, setSearchQuery] = useState('')
  const [verificationResult, setVerificationResult] = useState(null)
  const { isConnected, connect, account } = useWallet()
  const [showTransferModal, setShowTransferModal] = useState(false)
  const [transferContentId, setTransferContentId] = useState('')
  const [newOwnerAddress, setNewOwnerAddress] = useState('')
  
  const handleSearch = async (e) => {
    e.preventDefault()
    // Mock verification result
    setVerificationResult({
      title: "Sample Content",
      owner: "0x1453...715f4",
      timestamp: "2024-03-20",
      languages: ["English", "Spanish", "French"],
      status: "Verified",
      royalties: "5%",
      transactions: [
        { date: "2024-03-19", type: "Translation", language: "Spanish" },
        { date: "2024-03-18", type: "View", region: "Mexico" }
      ]
    })
  }

  const handleTransferOwnership = async () => {
    if (!transferContentId || !newOwnerAddress) {
      alert('Please fill in all fields')
      return
    }

    try {
      // Mock transfer success
      alert('Ownership transferred successfully!')
      setShowTransferModal(false)
    } catch (error) {
      alert('Failed to transfer ownership: ' + error.message)
    }
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] relative overflow-hidden">
      <Navbar />
      {/* Decorative red glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FF4B4B]/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-[#FF2D2D]/15 rounded-full blur-[100px]"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Copyright Verification</h1>
            <p className="text-gray-400">Verify content ownership and track usage across languages</p>
          </div>
          
          
        </div>

        {/* Search Section */}
        <div className="relative">
          <form onSubmit={handleSearch} className="bg-black/40 backdrop-blur-xl rounded-2xl p-8 border border-[#FF4B4B]/20">
            <div className="flex gap-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title, owner address, or content ID"
                className="flex-1 bg-white/5 border border-[#FF4B4B]/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#FF4B4B]/50 focus:ring-1 focus:ring-[#FF4B4B]/50"
              />
              <button 
                type="submit"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#FF4B4B] to-[#FF2D2D] text-white font-semibold hover:shadow-[0_0_30px_rgba(255,75,75,0.3)] transition-all duration-300 flex items-center gap-2"
              >
                Verify
                <span>🔍</span>
              </button>
            </div>
          </form>

          {/* Transfer Ownership Button */}
          <div className="mt-4">
            <button
              onClick={() => setShowTransferModal(true)}
              className="w-full px-6 py-4 rounded-xl bg-white/5 border border-[#FF4B4B]/20 text-white font-semibold hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" 
                />
              </svg>
              Transfer Ownership
            </button>
          </div>

          {/* Transfer Modal */}
          {showTransferModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
              <div className="bg-black/80 p-8 rounded-2xl border border-[#FF4B4B]/20 max-w-md w-full">
                <h3 className="text-xl font-semibold text-white mb-6">Transfer Content Ownership</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Content ID
                    </label>
                    <input
                      type="text"
                      value={transferContentId}
                      onChange={(e) => setTransferContentId(e.target.value)}
                      placeholder="Enter content ID"
                      className="w-full bg-white/5 border border-[#FF4B4B]/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#FF4B4B]/50 focus:ring-1 focus:ring-[#FF4B4B]/50"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      New Owner Address
                    </label>
                    <input
                      type="text"
                      value={newOwnerAddress}
                      onChange={(e) => setNewOwnerAddress(e.target.value)}
                      placeholder="Enter wallet address"
                      className="w-full bg-white/5 border border-[#FF4B4B]/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#FF4B4B]/50 focus:ring-1 focus:ring-[#FF4B4B]/50"
                    />
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <button
                    onClick={() => setShowTransferModal(false)}
                    className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-[#FF4B4B]/20 text-white font-medium hover:bg-white/10 transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleTransferOwnership}
                    className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-[#FF4B4B] to-[#FF2D2D] text-white font-medium hover:shadow-[0_0_30px_rgba(255,75,75,0.3)] transition-all duration-300"
                  >
                    Transfer
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Verification Result */}
          {verificationResult && (
            <div className="mt-8 bg-black/40 backdrop-blur-xl rounded-2xl p-8 border border-[#FF4B4B]/20">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">{verificationResult.title}</h2>
                <span className="px-4 py-1 rounded-full bg-gradient-to-r from-[#FF4B4B] to-[#FF2D2D] text-white text-sm">
                  {verificationResult.status}
                </span>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-white/5 rounded-xl p-4 border border-[#FF4B4B]/20">
                  <h3 className="text-gray-400 text-sm mb-2">Owner</h3>
                  <p className="text-white font-medium">{verificationResult.owner}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-[#FF4B4B]/20">
                  <h3 className="text-gray-400 text-sm mb-2">Registration Date</h3>
                  <p className="text-white font-medium">{verificationResult.timestamp}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-[#FF4B4B]/20">
                  <h3 className="text-gray-400 text-sm mb-2">Royalty Rate</h3>
                  <p className="text-white font-medium">{verificationResult.royalties}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-[#FF4B4B]/20">
                  <h3 className="text-gray-400 text-sm mb-2">Available Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {verificationResult.languages.map(lang => (
                      <span 
                        key={lang}
                        className="px-2 py-1 rounded-md bg-[#FF4B4B]/20 text-[#FF4B4B] text-sm"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Transaction History */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Transaction History</h3>
                <div className="space-y-4">
                  {verificationResult.transactions.map((tx, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-4 bg-white/5 rounded-xl p-4 border border-[#FF4B4B]/20"
                    >
                      <div className="w-10 h-10 rounded-full bg-[#FF4B4B]/20 flex items-center justify-center text-xl">
                        {tx.type === 'Translation' ? '🔄' : '👁️'}
                      </div>
                      <div>
                        <h4 className="text-white font-medium">{tx.type}</h4>
                        <p className="text-gray-400 text-sm">{tx.date}</p>
                        {tx.language && (
                          <p className="text-[#FF4B4B] text-sm">Language: {tx.language}</p>
                        )}
                        {tx.region && (
                          <p className="text-[#FF4B4B] text-sm">Region: {tx.region}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
