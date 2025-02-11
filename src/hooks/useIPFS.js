import { useState } from 'react'

export function useIPFS() {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState(null)

  const uploadToIPFS = async (content) => {
    setIsUploading(true)
    setError(null)
    
    try {
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Generate mock IPFS hash
      const mockHash = 'Qm' + Math.random().toString(36).substring(2, 15) + 
                      Math.random().toString(36).substring(2, 15)
      
      // Log the content type for debugging
      console.log('Uploading content:', typeof content === 'string' ? 'text' : 'file')
      
      return mockHash
    } catch (err) {
      setError('Failed to upload to IPFS')
      throw new Error('Failed to upload to IPFS')
    } finally {
      setIsUploading(false)
    }
  }

  return {
    uploadToIPFS,
    isUploading,
    error
  }
} 