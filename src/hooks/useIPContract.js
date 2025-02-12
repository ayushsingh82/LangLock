import { useAccount, useContractRead, useContractWrite } from 'wagmi'
import { CONTRACT_ADDRESS } from '../config'
import { wagmiAbi } from '../abi'

export function useIPContract() {
  const { address } = useAccount()

  const { writeAsync: registerContentWrite } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: wagmiAbi,
    functionName: 'registerContent',
  })

  const { writeAsync: addTranslationWrite } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: wagmiAbi,
    functionName: 'addTranslation',
  })

  const { writeAsync: licenseContentWrite } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: wagmiAbi,
    functionName: 'licenseContent',
  })

  const registerContent = async (metadataURI, language, price) => {
    try {
      const tx = await registerContentWrite({
        args: [metadataURI, language, price],
      })
      await tx.wait()
      return tx
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
      await tx.wait()
      return tx
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
      await tx.wait()
      return tx
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