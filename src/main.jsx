import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { Home } from './components/Home.jsx'
import { Upload } from './components/Upload.jsx'
import { Copyright } from './components/Copyright.jsx'
import { Exchange } from './components/Exchange.jsx'

// Import Wagmi and RainbowKit
import { WagmiProvider } from 'wagmi'
import { bscTestnet } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import { seiTestnet } from './config'

// Configure for BSC Testnet
const config = getDefaultConfig({
  appName: 'Language AI',
  projectId: 'e7fa7d19fd057ecd9403a0e89bd62b8b', // Your project ID
  chains: [seiTestnet],
  ssr: false
})

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<App />}>
                <Route index element={<Home />} />
                <Route path="upload" element={<Upload />} />
                <Route path="copyright" element={<Copyright />} />
                <Route path="exchange" element={<Exchange />} />
                {/* Add more routes here later */}
              </Route>
            </Routes>
          </BrowserRouter>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
)
