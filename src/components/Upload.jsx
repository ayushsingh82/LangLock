import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import '../App.css'
import { useWallet } from '../hooks/useWallet'
import { useIPFS } from '../hooks/useIPFS'
import { useAITranslation } from '../hooks/useAITranslation'

export function Upload() {
  const [contentType, setContentType] = useState('video')
  const [file, setFile] = useState(null)
  const [text, setText] = useState('')
  const [targetLanguages, setTargetLanguages] = useState([])
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('entertainment')
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [translations, setTranslations] = useState(null)
  
  // Add new state for blockchain interaction
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [contentHash, setContentHash] = useState('')
  const [nftMinted, setNftMinted] = useState(false)

  // Add wallet connection
  const { connect, account, isConnected } = useWallet()

  // Add IPFS and AI hooks
  const { uploadToIPFS } = useIPFS()
  const { translateContent } = useAITranslation()

  const languages = [
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'ru', name: 'Russian' },
    { code: 'zh', name: 'Chinese' },
    { code: 'ja', name: 'Japanese' },
    { code: 'ko', name: 'Korean' },
    { code: 'hi', name: 'Hindi' }
  ]

  const categories = [
    'entertainment',
    'education',
    'business',
    'technology',
    'lifestyle',
    'news',
    'other'
  ]

  const onDrop = useCallback(acceptedFiles => {
    const uploadedFile = acceptedFiles[0]
    if (uploadedFile) {
      setFile(uploadedFile)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.mov', '.avi', '.mkv']
    },
    multiple: false
  })

  const handleLanguageToggle = (langCode) => {
    setTargetLanguages(prev => 
      prev.includes(langCode)
        ? prev.filter(code => code !== langCode)
        : [...prev, langCode]
    )
  }

  const translateText = async (text, targetLang) => {
    // This is a simple mock translation function
    // In a real app, you would use a translation API
    const commonPhrases = {
      'hello': {
        'es': 'hola',
        'fr': 'bonjour',
        'de': 'hallo',
        'it': 'ciao',
        'pt': 'olá',
        'ru': 'привет',
        'zh': '你好',
        'ja': 'こんにちは',
        'ko': '안녕하세요',
        'hi': 'नमस्ते'
      },
      'how are you': {
        'es': '¿cómo estás?',
        'fr': 'comment allez-vous?',
        'de': 'wie geht es dir?',
        'it': 'come stai?',
        'pt': 'como você está?',
        'ru': 'как дела?',
        'zh': '你好吗？',
        'ja': 'お元気ですか？',
        'ko': '어떻게 지내세요?',
        'hi': 'आप कैसे हैं?'
      },
      'good morning': {
        'es': 'buenos días',
        'fr': 'bonjour',
        'de': 'guten morgen',
        'it': 'buongiorno',
        'pt': 'bom dia',
        'ru': 'доброе утро',
        'zh': '早上好',
        'ja': 'おはようございます',
        'ko': '좋은 아침입니다',
        'hi': 'सुप्रभात'
      }
      // Add more common phrases as needed
    }

    const inputLower = text.toLowerCase()
    for (const [phrase, translations] of Object.entries(commonPhrases)) {
      if (inputLower.includes(phrase)) {
        return translations[targetLang] || text
      }
    }
    return `[${text} - Translated to ${targetLang}]` // Fallback for unknown phrases
  }

  const mockTranslationProcess = async () => {
    for (let i = 0; i <= 100; i += 10) {
      setProgress(i)
      await new Promise(resolve => setTimeout(resolve, 500))
    }

    const inputContent = contentType === 'text' ? text : 'Sample video transcript: Hello, how are you?'
    
    // Translate the actual input text
    const mockTranslations = await Promise.all(
      targetLanguages.map(async (langCode) => {
        const language = languages.find(l => l.code === langCode)
        const translatedText = await translateText(inputContent, langCode)
        return {
          language: language.name,
          translatedText
        }
      })
    )
    
    setTranslations(mockTranslations)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isConnected) {
      alert('Please connect your wallet first')
      return
    }
    
    if (targetLanguages.length === 0) {
      alert('Please select at least one target language')
      return
    }
    
    setIsProcessing(true)
    setTranslations(null)

    try {
      // 1. Upload original content to IPFS
      setIsUploading(true)
      const hash = await uploadToIPFS(contentType === 'video' ? file : text)
      setContentHash(hash)
      
      // 2. Process translations
      const translatedContent = await translateContent(hash, targetLanguages)
      setTranslations(translatedContent)

      // 3. Mint NFT with content metadata
      await mintContentNFT(hash, translatedContent)
      setNftMinted(true)

    } catch (error) {
      console.error('Upload failed:', error)
      alert('Upload failed: ' + error.message)
    } finally {
      setIsProcessing(false)
      setIsUploading(false)
      setProgress(0)
    }
  }

  // Add NFT minting function
  const mintContentNFT = async (contentHash, translations) => {
    // Implementation will come in the next step
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] relative overflow-hidden">
      {/* Decorative red glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FF4B4B]/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-[#FF2D2D]/15 rounded-full blur-[100px]"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">Content Translation</h1>
          
          {/* Add wallet connection button */}
          {!isConnected ? (
            <button
              onClick={connect}
              className="px-6 py-2 rounded-xl bg-gradient-to-r from-[#FF4B4B] to-[#FF2D2D] text-white font-semibold hover:shadow-[0_0_30px_rgba(255,75,75,0.3)] transition-all duration-300"
            >
              Connect Wallet
            </button>
          ) : (
            <div className="text-white/80">
              Connected: {account.slice(0, 6)}...{account.slice(-4)}
            </div>
          )}
        </div>
        
        <div className="relative">
          <form onSubmit={handleSubmit} className="bg-black/40 backdrop-blur-xl rounded-2xl p-8 border border-[#FF4B4B]/20">
            {/* Content Type Section */}
            <div className="mb-8 pb-6 border-b border-[#FF4B4B]/10">
              <h2 className="text-xl font-semibold text-white mb-4">1. Choose Content Type</h2>
              <div className="flex gap-4">
                <button
                  type="button"
                  className={`flex-1 px-4 py-3 rounded-xl backdrop-blur-sm transition-all duration-300 flex items-center justify-center gap-2
                    ${contentType === 'video' 
                      ? 'bg-gradient-to-r from-[#FF4B4B] to-[#FF2D2D] text-white' 
                      : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-[#FF4B4B]/20'}`}
                  onClick={() => setContentType('video')}
                >
                  <span className="text-xl">🎥</span>
                  Video
                </button>
                <button
                  type="button"
                  className={`flex-1 px-4 py-3 rounded-xl backdrop-blur-sm transition-all duration-300 flex items-center justify-center gap-2
                    ${contentType === 'text' 
                      ? 'bg-gradient-to-r from-[#FF4B4B] to-[#FF2D2D] text-white' 
                      : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-[#FF4B4B]/20'}`}
                  onClick={() => setContentType('text')}
                >
                  <span className="text-xl">📝</span>
                  Text
                </button>
              </div>
            </div>

            {/* Content Input Section */}
            <div className="mb-8 pb-6 border-b border-[#FF4B4B]/10">
              <h2 className="text-xl font-semibold text-white mb-4">2. Add Your Content</h2>
              {contentType === 'video' ? (
                <div {...getRootProps()} className="border-2 border-dashed border-[#FF4B4B]/30 rounded-xl p-8 text-center hover:border-[#FF4B4B]/60 transition-all duration-300 bg-white/5">
                  <input {...getInputProps()} />
                  <div className="text-gray-300">
                    <span className="text-2xl block mb-2">📤</span>
                    {file ? file.name : isDragActive
                      ? 'Drop the video here...'
                      : 'Drag & drop video or click to browse'
                    }
                  </div>
                </div>
              ) : (
                <textarea
                  placeholder="Enter your text content here..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="w-full h-40 bg-white/5 border border-[#FF4B4B]/20 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#FF4B4B]/50 focus:ring-1 focus:ring-[#FF4B4B]/50"
                  required={contentType === 'text'}
                />
              )}
            </div>

            {/* Language Selection Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-white mb-4">3. Select Target Languages</h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {languages.map(lang => (
                  <label key={lang.code} className="relative">
                    <input
                      type="checkbox"
                      checked={targetLanguages.includes(lang.code)}
                      onChange={() => handleLanguageToggle(lang.code)}
                      className="peer hidden"
                    />
                    <div className="cursor-pointer px-4 py-3 rounded-lg bg-white/5 border border-[#FF4B4B]/20 text-gray-300 peer-checked:bg-gradient-to-r from-[#FF4B4B] to-[#FF2D2D] peer-checked:text-white transition-all duration-300 text-center hover:bg-white/10">
                      {lang.name}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Progress Bar */}
            {isProcessing && (
              <div className="mb-6 bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-2 bg-gradient-to-r from-[#FF4B4B] to-[#FF2D2D] transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            )}

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={isProcessing || (!text && contentType === 'text') || (!file && contentType === 'video')}
              className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#FF4B4B] to-[#FF2D2D] text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_30px_rgba(255,75,75,0.3)] transition-all duration-300"
            >
              {isProcessing ? 'Translating...' : 'Translate Content'}
              {!isProcessing && <span className="ml-2">→</span>}
            </button>
          </form>

          {/* Translations Output */}
          {translations && translations.length > 0 && (
            <div className="mt-8 bg-black/40 backdrop-blur-xl rounded-2xl p-8 border border-[#FF4B4B]/20">
              <h2 className="text-xl font-semibold text-white mb-6">Translations</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {translations.map((translation, index) => (
                  <div key={index} className="bg-white/5 rounded-xl overflow-hidden border border-[#FF4B4B]/20">
                    <div className="bg-gradient-to-r from-[#FF4B4B] to-[#FF2D2D] px-4 py-3 flex justify-between items-center">
                      <h3 className="text-white font-medium">{translation.language}</h3>
                      {contentType === 'video' && (
                        <button className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-all">
                          <span>▶️</span>
                        </button>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="text-gray-300">
                        {translation.translatedText}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Add NFT minting success message */}
        {nftMinted && (
          <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-[#FF4B4B]/20 to-[#FF2D2D]/20 border border-[#FF4B4B]/30">
            <p className="text-white">
              🎉 Content successfully minted as NFT! View on{' '}
              <a 
                href={`https://sei.explorers.guru/token/${contentHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FF4B4B] hover:text-[#FF2D2D]"
              >
                Explorer
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
