import { useState } from 'react'
import axios from 'axios'

export function useVideoTranslation() {
  const [isTranslating, setIsTranslating] = useState(false)
  const [error, setError] = useState(null)
  const [translationStatus, setTranslationStatus] = useState(null)
  const [videoData, setVideoData] = useState(null)

  const translateVideo = async (videoUrl, outputLanguage) => {
    setIsTranslating(true)
    setError(null)

    try {
      const response = await axios.post('https://api.hygen.com/v2/video_translate', {
        video_url: videoUrl,
        output_language: outputLanguage
      }, {
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_HYGEN_API_KEY}`,
          'Content-Type': 'application/json'
        }
      })

      const { video_translate_id } = response.data
      setTranslationStatus({ id: video_translate_id, status: 'pending' })
      return video_translate_id
    } catch (err) {
      setError(err.response?.data?.message || err.message)
      throw err
    } finally {
      setIsTranslating(false)
    }
  }

  const checkStatus = async (videoId) => {
    try {
      const response = await axios.get(`https://api.hygen.com/v2/video_translate/${videoId}/status`, {
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_HYGEN_API_KEY}`
        }
      })

      const { status, url, title } = response.data
      setVideoData({ status, url, title, id: videoId })
      return { status, url, title }
    } catch (err) {
      setError(err.response?.data?.message || err.message)
      throw err
    }
  }

  return {
    translateVideo,
    checkStatus,
    isTranslating,
    translationStatus,
    videoData,
    error
  }
}