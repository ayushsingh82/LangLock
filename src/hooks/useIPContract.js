import { useAccount, useWriteContract } from 'wagmi'
import { CONTRACT_ADDRESS } from '../config'
import { wagmiAbi } from '../abi'

export function useIPContract() {
  const { address } = useAccount()

  const { write: registerContentWrite } = useWriteContract({
    address: CONTRACT_ADDRESS,
    abi: wagmiAbi,
    functionName: 'registerContent',
  })

  const { write: addTranslationWrite } = useWriteContract({
    address: CONTRACT_ADDRESS,
    abi: wagmiAbi,
    functionName: 'addTranslation',
  })

  const { write: licenseContentWrite } = useWriteContract({
    address: CONTRACT_ADDRESS,
    abi: wagmiAbi,
    functionName: 'licenseContent',
  })

  const registerContent = async (metadataURI, language, price) => {
    try {
      const tx = await registerContentWrite({
        args: [metadataURI, language, price],
      })
      if (tx) {
        await tx.wait()
        return tx
      }
      throw new Error('Transaction failed')
    } catch (error) {
      console.error('Error registering content:', error)
      throw error
    }
  }

  const addTranslation = async (contentId, language, translationURI) => {
    try {
      const tx = await addTranslationWrite({
        args: [contentId, language, translationURI],
      })
      if (tx) {
        await tx.wait()
        return tx
      }
      throw new Error('Transaction failed')
    } catch (error) {
      console.error('Error adding translation:', error)
      throw error
    }
  }

  const licenseContent = async (contentId, price) => {
    try {
      const tx = await licenseContentWrite({
        args: [contentId],
        value: price,
      })
      if (tx) {
        await tx.wait()
        return tx
      }
      throw new Error('Transaction failed')
    } catch (error) {
      console.error('Error licensing content:', error)
      throw error
    }
  }

  return {
    registerContent,
    addTranslation,
    licenseContent,
    address
  }
}