import { useState, useEffect } from 'react'
import { Navbar } from './Navbar'
import { motion } from 'framer-motion'
import { ArrowDownUp, Settings, Info, Loader } from 'lucide-react'
import axios from 'axios'

// Token IDs for CoinGecko
const TOKENS = {
  SEI: {
    symbol: 'SEI',
    name: 'Sei',
    address: '0x9c1CB740f3b631ed53600058ae5B2f83E15d9fBF',
    decimals: 18,
    coingeckoId: 'sei-network'
  },
  USDC: {
    symbol: 'USDC',
    name: 'USD Coin',
    address: '0x5425890298aed601595a70AB815c96711a31Bc65',
    decimals: 6,
    coingeckoId: 'usd-coin'
  },
  USDT: {
    symbol: 'USDT',
    name: 'Tether',
    address: '0x14C886c33962591E655e0d75BCe812f4F7578c58',
    decimals: 6,
    coingeckoId: 'tether'
  },
  WSEI: {
    symbol: 'WSEI',
    name: 'Wrapped SEI',
    address: '0xF4C8E32EaDEC4BFe97E0F595AdD0f4450a863a11',
    decimals: 18,
    coingeckoId: 'sei-network'
  }
}

// Update chainId to Sei's chain ID
const chainId = '713715' // Sei EVM chain ID

export function Swap() {
  const [fromToken, setFromToken] = useState('SEI')
  const [toToken, setToToken] = useState('USDC')
  const [fromAmount, setFromAmount] = useState('')
  const [toAmount, setToAmount] = useState('')
  const [slippage, setSlippage] = useState('0.5')
  const [showSettings, setShowSettings] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [swapUrl, setSwapUrl] = useState('')
  const [tokenPrices, setTokenPrices] = useState({})

  // Fetch token prices from CoinGecko
  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const ids = [...new Set(Object.values(TOKENS).map(t => t.coingeckoId))].join(',')
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`
        )
        setTokenPrices(response.data)
      } catch (err) {
        console.error('Error fetching prices:', err)
        setError('Failed to fetch token prices')
      }
    }

    fetchPrices()
    // Refresh prices every minute
    const interval = setInterval(fetchPrices, 60000)
    return () => clearInterval(interval)
  }, [])

  const getTokenPrice = (symbol) => {
    const token = TOKENS[symbol]
    return tokenPrices[token.coingeckoId]?.usd || 0
  }

  const getQuote = async (fromTokenAddress, toTokenAddress, amount) => {
    if (!amount || parseFloat(amount) === 0) {
      setToAmount('')
      setSwapUrl('')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      // Get current prices
      const fromPrice = getTokenPrice(fromToken)
      const toPrice = getTokenPrice(toToken)

      if (!fromPrice || !toPrice) {
        throw new Error('Price data not available')
      }

      // Calculate conversion using simple multiplication
      const fromAmountNumber = parseFloat(amount)
      const exchangeRate = fromPrice / toPrice
      const toAmountNumber = fromAmountNumber * exchangeRate

      // Format the result with appropriate decimals
      const formattedToAmount = toAmountNumber.toFixed(6)
      setToAmount(formattedToAmount)
      
      // Generate swap URL
      const swapLink = `https://app.1inch.io/#/${chainId}/unified/swap/${fromTokenAddress}/${toTokenAddress}`
      setSwapUrl(swapLink)

      // Add slippage impact
      const slippageImpact = (parseFloat(slippage) / 100)
      const finalAmount = toAmountNumber * (1 - slippageImpact)
      
      return {
        toAmount: finalAmount.toFixed(6),
        priceImpact: slippage
      }

    } catch (err) {
      console.error('Error calculating quote:', err)
      setError(err.message || 'Failed to calculate quote')
    } finally {
      setIsLoading(false)
    }
  }

  // Update price display
  const getPriceRatio = (from, to) => {
    const fromPrice = getTokenPrice(from)
    const toPrice = getTokenPrice(to)
    if (!fromPrice || !toPrice) return '0.00'
    return (fromPrice / toPrice).toFixed(6)
  }

  const handleFromAmountChange = (value) => {
    setFromAmount(value)
    if (value && !isNaN(value)) {
      const fromTokenData = TOKENS[fromToken]
      const toTokenData = TOKENS[toToken]
      const amount = parseFloat(value) * Math.pow(10, fromTokenData.decimals)
      getQuote(fromTokenData.address, toTokenData.address, amount.toString())
    }
  }

  const handleSwitch = () => {
    setFromToken(toToken)
    setToToken(fromToken)
    setFromAmount(toAmount)
    setToAmount(fromAmount)
    if (toAmount) {
      const fromTokenData = TOKENS[toToken]
      const toTokenData = TOKENS[fromToken]
      const amount = parseFloat(toAmount) * Math.pow(10, fromTokenData.decimals)
      getQuote(fromTokenData.address, toTokenData.address, amount.toString())
    }
  }

  const handleSwap = async () => {
    if (swapUrl) {
      window.open(swapUrl, '_blank')
    }
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
        <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-8 border border-[#FF4B4B]/20">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Swap</h2>
            <button 
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors"
            >
              <Settings className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Settings Panel */}
          {showSettings && (
            <div className="mb-6 p-4 bg-white/5 rounded-xl border border-[#FF4B4B]/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">Slippage Tolerance</span>
                  <Info className="w-4 h-4 text-gray-500" />
                </div>
                <div className="flex gap-2">
                  {['0.5', '1.0', '2.0'].map((value) => (
                    <button
                      key={value}
                      onClick={() => setSlippage(value)}
                      className={`px-3 py-1 rounded-lg text-sm ${
                        slippage === value
                          ? 'bg-gradient-to-r from-[#FF4B4B] to-[#FF2D2D] text-white'
                          : 'bg-white/5 text-gray-400'
                      }`}
                    >
                      {value}%
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* From Token */}
          <div className="space-y-6">
            <div className="bg-white/5 p-4 rounded-xl border border-[#FF4B4B]/20">
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">From</span>
                <span className="text-gray-400">Balance: 0.00</span>
              </div>
              <div className="flex gap-4">
                <input
                  type="number"
                  value={fromAmount}
                  onChange={(e) => handleFromAmountChange(e.target.value)}
                  placeholder="0.00"
                  className="bg-transparent text-2xl text-white placeholder-gray-600 outline-none flex-1"
                />
                <select
                  value={fromToken}
                  onChange={(e) => {
                    setFromToken(e.target.value)
                    if (fromAmount) handleFromAmountChange(fromAmount)
                  }}
                  className="bg-white/5 text-white px-4 py-2 rounded-xl border border-[#FF4B4B]/20 outline-none"
                >
                  {Object.keys(TOKENS).map(symbol => (
                    <option 
                      key={symbol} 
                      value={symbol}
                      className="bg-[#1a1b1e]"
                    >
                      {symbol}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Switch Button */}
            <div className="flex justify-center -my-3 relative z-10">
              <button
                onClick={handleSwitch}
                className="bg-gradient-to-r from-[#FF4B4B] to-[#FF2D2D] p-2 rounded-xl hover:shadow-[0_0_20px_rgba(255,75,75,0.3)] transition-all duration-300"
              >
                <ArrowDownUp className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* To Token */}
            <div className="bg-white/5 p-4 rounded-xl border border-[#FF4B4B]/20">
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">To</span>
                <span className="text-gray-400">Balance: 0.00</span>
              </div>
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={toAmount}
                    readOnly
                    placeholder="0.00"
                    className="bg-transparent text-2xl text-white placeholder-gray-600 outline-none w-full"
                  />
                  {isLoading && (
                    <div className="absolute right-2 top-1/2 -translate-y-1/2">
                      <Loader className="w-5 h-5 text-[#FF4B4B] animate-spin" />
                    </div>
                  )}
                </div>
                <select
                  value={toToken}
                  onChange={(e) => {
                    setToToken(e.target.value)
                    if (fromAmount) handleFromAmountChange(fromAmount)
                  }}
                  className="bg-white/5 text-white px-4 py-2 rounded-xl border border-[#FF4B4B]/20 outline-none"
                >
                  {Object.keys(TOKENS).map(symbol => (
                    <option 
                      key={symbol} 
                      value={symbol}
                      className="bg-[#1a1b1e]"
                    >
                      {symbol}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}

            {/* Price display */}
            {fromAmount && !isLoading && (
              <div className="mt-4 text-sm text-gray-400 text-center">
                1 {fromToken} = {getPriceRatio(fromToken, toToken)} {toToken}
                <br />
                1 {toToken} = {getPriceRatio(toToken, fromToken)} {fromToken}
              </div>
            )}

            {/* Swap Button */}
            <button
              onClick={handleSwap}
              disabled={!fromAmount || !toAmount || isLoading}
              className="w-full py-4 px-6 bg-gradient-to-r from-[#FF4B4B] to-[#FF2D2D] text-white font-semibold rounded-xl hover:shadow-[0_0_30px_rgba(255,75,75,0.3)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Getting Quote...' : 'Swap on 1inch'}
            </button>

            {swapUrl && (
              <div className="mt-4 text-center">
                <a 
                  href={swapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FF4B4B] hover:text-[#FF2D2D] text-sm"
                >
                  Open in 1inch
                </a>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}