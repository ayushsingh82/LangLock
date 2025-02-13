import { useState } from 'react'
import { Navbar } from './Navbar'
import { DollarSign, Loader, Coins } from 'lucide-react'
import { motion } from 'framer-motion'
import { Dialog, Transition } from '@headlessui/react'
import Stripe from 'stripe'

const stripe = new Stripe(import.meta.env.VITE_STRIPE_SECRET_KEY || '')

export function Exchange() {
  const [activeTab, setActiveTab] = useState('buy')
  const [fiatAmount, setFiatAmount] = useState('')
  const [usdcAmount, setUsdcAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showNoticeModal, setShowNoticeModal] = useState(false)

  // Simple validation function
  const validateTransaction = (fiatAmount, usdcAmount) => {
    const fiat = parseFloat(fiatAmount)
    const usdc = parseFloat(usdcAmount)

    if (fiat < 10) {
      return {
        canPerformTransaction: false,
        reason: "Minimum transaction amount is $10"
      }
    }
    if (fiat > 10000) {
      return {
        canPerformTransaction: false,
        reason: "Maximum transaction amount is $10,000"
      }
    }
    if (Math.abs(fiat / usdc - 1) > 0.1) {
      return {
        canPerformTransaction: false,
        reason: "Exchange rate difference is too high"
      }
    }
    return {
      canPerformTransaction: true,
      reason: "Transaction validated"
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (activeTab === 'buy') {
      setShowNoticeModal(true)
      return
    }

    setLoading(true)
    setError('')
    setIsModalOpen(true)

    try {
      // Validate transaction
      const validation = validateTransaction(fiatAmount, usdcAmount)
      
      if (!validation.canPerformTransaction) {
        setError(validation.reason)
        setLoading(false)
        setIsModalOpen(false)
        return
      }

      // Create Stripe product and session
      const product = await stripe.products.create({
        name: "FIAT AI PAYMENT",
        default_price_data: {
          currency: "usd",
          unit_amount: Number(fiatAmount) * 100, // Convert to cents
        },
      })

      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price: product.default_price,
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${window.location.href.split("/exchange")[0]}/success?fiatAmount=${fiatAmount}&usdcAmount=${usdcAmount}&type=sell`,
        cancel_url: `${window.location.href}`,
      })

      if (session.url) {
        window.location.href = session.url
      } else {
        throw new Error('Failed to create checkout session')
      }

    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.')
      console.error(err)
    }

    setLoading(false)
    setIsModalOpen(false)
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] relative overflow-hidden">
      <Navbar />
      
      {/* Decorative red glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FF4B4B]/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-[#FF2D2D]/15 rounded-full blur-[100px]"></div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative max-w-lg mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('buy')}
            className={`flex-1 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 flex items-center justify-center gap-2
              ${activeTab === 'buy' 
                ? 'bg-gradient-to-r from-[#FF4B4B] to-[#FF2D2D] text-white shadow-[0_0_30px_rgba(255,75,75,0.3)]' 
                : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-[#FF4B4B]/20'}`}
          >
            <Coins className="h-5 w-5" />
            Buy Fiat from USDC
          </button>
          <button
            onClick={() => setActiveTab('sell')}
            className={`flex-1 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 flex items-center justify-center gap-2
              ${activeTab === 'sell' 
                ? 'bg-gradient-to-r from-[#FF4B4B] to-[#FF2D2D] text-white shadow-[0_0_30px_rgba(255,75,75,0.3)]' 
                : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-[#FF4B4B]/20'}`}
          >
            <DollarSign className="h-5 w-5" />
            Buy Crypto with USD
          </button>
        </div>

        {/* Exchange Form */}
        <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-8 border border-[#FF4B4B]/20">
          <div className="flex items-center justify-center mb-6">
            {activeTab === 'buy' ? (
              <Coins className="h-12 w-12 text-[#FF4B4B]" />
            ) : (
              <DollarSign className="h-12 w-12 text-[#FF4B4B]" />
            )}
          </div>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Fiat Amount (USD)
              </label>
              <input
                type="number"
                value={fiatAmount}
                onChange={(e) => setFiatAmount(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-[#FF4B4B]/20 rounded-xl text-white focus:ring-2 focus:ring-[#FF4B4B] focus:border-transparent"
                placeholder="Enter amount in USD"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                USDC Amount
              </label>
              <input
                type="number"
                value={usdcAmount}
                onChange={(e) => setUsdcAmount(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-[#FF4B4B]/20 rounded-xl text-white focus:ring-2 focus:ring-[#FF4B4B] focus:border-transparent"
                placeholder="Enter amount in USDC"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 px-6 bg-gradient-to-r from-[#FF4B4B] to-[#FF2D2D] text-white font-semibold rounded-xl hover:shadow-[0_0_30px_rgba(255,75,75,0.3)] transition-all duration-300"
              disabled={loading}
            >
              {loading ? "Processing..." : "Proceed to Payment"}
            </button>
          </form>
        </div>

        {/* AI Processing Modal */}
        <Transition show={isModalOpen}>
          <Dialog onClose={() => setIsModalOpen(false)} className="relative z-50">
            <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="bg-black/80 p-6 rounded-xl text-center border border-[#FF4B4B]/20"
              >
                <Loader className="h-12 w-12 text-[#FF4B4B] animate-spin mx-auto mb-4" />
                <p className="text-white text-lg font-semibold">
                  Processing your transaction...
                </p>
              </motion.div>
            </div>
          </Dialog>
        </Transition>

        {/* Notice Modal */}
        {showNoticeModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-black/80 p-6 rounded-xl border border-[#FF4B4B]/20 max-w-sm text-center">
              <h2 className="text-lg font-semibold text-white mb-4">Notice</h2>
              <p className="text-gray-300 mb-4">
                The Indian Government does not provide fiat demo transactions. For this hackathon, you can try selling fiat to buy crypto instead.
              </p>
              <button
                onClick={() => setShowNoticeModal(false)}
                className="bg-gradient-to-r from-[#FF4B4B] to-[#FF2D2D] text-white py-2 px-4 rounded-xl hover:shadow-[0_0_30px_rgba(255,75,75,0.3)] transition-all duration-300"
              >
                Understood
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
} 