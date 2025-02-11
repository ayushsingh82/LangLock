import { useState } from 'react'

export function useWallet() {
  const [isConnected, setIsConnected] = useState(false)
  const [account, setAccount] = useState('')

  // Mock wallet address
  const mockAddress = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'

  const connect = async () => {
    // Simulate connection delay
    await new Promise(resolve => setTimeout(resolve, 800))
    setIsConnected(true)
    setAccount(mockAddress)
  }

  const disconnect = () => {
    setIsConnected(false)
    setAccount('')
  }

  return {
    connect,
    disconnect,
    account,
    isConnected,
    // Add other mock wallet properties as needed
    chainId: '1',
    balance: '1000000000000000000', // 1 SEI in wei
    network: 'sei-testnet'
  }
} 