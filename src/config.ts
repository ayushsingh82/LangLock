import { createPublicClient, createWalletClient, custom, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'

// Define Sei Testnet chain configuration
export const seiTestnet = {
  id: 1_328,
  name: 'Sei Testnet',
  network: 'sei-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'SEI',
    symbol: 'SEI',
  },
  rpcUrls: {
    default: {
      http: ['https://evm-rpc-testnet.sei-apis.com'],
    },
    public: {
      http: ['https://evm-rpc-testnet.sei-apis.com'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Sei Explorer',
      url: 'https://sei.explorers.guru',
    },
  },
  testnet: true,
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 1_234_567,
    },
  },
} as const

// Create Viem Clients
export const publicClient = createPublicClient({
  chain: seiTestnet,
  transport: http()
})

export const walletClient = createWalletClient({
  chain: seiTestnet,
  transport: custom(window.ethereum)
})

// Contract and IPFS Configuration
export const CONTRACT_ADDRESS = "your_deployed_contract_address"
export const IPFS_GATEWAY = "https://ipfs.io/ipfs/"

// Local Account (for testing)
export const account = privateKeyToAccount('0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e')

// RPC Configuration
export const RPC_CONFIG = {
  chainId: '0x530', // 1328 in hex
  chainName: 'Sei Testnet',
  nativeCurrency: {
    name: 'SEI',
    symbol: 'SEI',
    decimals: 18,
  },
  rpcUrls: ['https://evm-rpc-testnet.sei-apis.com'],
  blockExplorerUrls: ['https://sei.explorers.guru'],
}

// Export chain configuration for wagmi
export const chains = [seiTestnet]
