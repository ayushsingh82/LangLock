import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import '../App.css'
import { useWallet } from '../hooks/useWallet'
import { useIPFS } from '../hooks/useIPFS'
import { useAITranslation } from '../hooks/useAITranslation'
import { Navbar } from './Navbar'
import { useIPContract } from '../hooks/useIPContract'
import { parseEther } from 'viem'

export function Upload() {
  const [activeTab, setActiveTab] = useState('video') // 'video' or 'text'
  const [file, setFile] = useState(null)
  const [text, setText] = useState('')
  const [targetLanguage, setTargetLanguage] = useState('')
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

  // Add new state for video URL
  const [videoUrl, setVideoUrl] = useState('')
  const [uploadType, setUploadType] = useState('file') // 'file' or 'url'

  // Add new state for text description
  const [textDescription, setTextDescription] = useState('')

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

  const { registerContent, addTranslation } = useIPContract()

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
    setTargetLanguage(langCode)
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

    const inputContent = activeTab === 'text' ? text : 'Sample video transcript: Hello, how are you?'
    
    // Translate the actual input text
    const mockTranslations = await Promise.all(
      [targetLanguage].map(async (langCode) => {
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
    
    try {
      // 1. Upload original content to IPFS
      setIsUploading(true)
      const contentHash = await uploadToIPFS(activeTab === 'video' ? file : text)
      
      // 2. Register content on blockchain
      const price = parseEther('0.1')
      const tx = await registerContent(contentHash, 'en', price)
      const contentId = tx.events[0].args.id
      
      // 3. Process translation
      const translatedContent = await translateContent(contentHash, [targetLanguage])
      
      // 4. Upload translation to IPFS and register on blockchain
      const translationHash = await uploadToIPFS(translatedContent)
      await addTranslation(contentId, targetLanguage, translationHash)
      
      setNftMinted(true)
      setContentHash(contentHash)

    } catch (error) {
      console.error('Upload failed:', error)
      alert('Upload failed: ' + error.message)
    } finally {
      setIsProcessing(false)
      setIsUploading(false)
      setProgress(0)
    }
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] relative overflow-hidden">
      <Navbar />
      {/* Decorative red glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FF4B4B]/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-[#FF2D2D]/15 rounded-full blur-[100px]"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('video')}
            className={`flex-1 px-4 py-2 rounded-lg text-base font-medium transition-all duration-300 flex items-center justify-center gap-2
              ${activeTab === 'video' 
                ? 'bg-gradient-to-r from-[#FF4B4B] to-[#FF2D2D] text-white shadow-[0_0_30px_rgba(255,75,75,0.3)]' 
                : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
          >
            <span className="text-xl">��</span>
            Video Upload
          </button>
          <button
            onClick={() => setActiveTab('text')}
            className={`flex-1 px-4 py-2 rounded-lg text-base font-medium transition-all duration-300 flex items-center justify-center gap-2
              ${activeTab === 'text' 
                ? 'bg-gradient-to-r from-[#FF4B4B] to-[#FF2D2D] text-white shadow-[0_0_30px_rgba(255,75,75,0.3)]' 
                : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
          >
            <span className="text-xl">📝</span>
            Text Upload
          </button>
        </div>

        <div className="relative">
          <form onSubmit={handleSubmit} className="bg-black/40 backdrop-blur-xl rounded-2xl p-8 border border-[#FF4B4B]/20">
            {/* Content Input Section */}
            <div className="mb-8 pb-6 border-b border-[#FF4B4B]/10">
              {activeTab === 'video' && (
                <div className="space-y-6">
                  {/* Video Upload Type Toggle */}
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setUploadType('file')}
                      className={`flex-1 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2
                        ${uploadType === 'file' 
                          ? 'bg-gradient-to-r from-[#FF4B4B] to-[#FF2D2D] text-white' 
                          : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-[#FF4B4B]/20'}`}
                    >
                      <span>📁</span>
                      Upload File
                    </button>
                    <button
                      type="button"
                      onClick={() => setUploadType('url')}
                      className={`flex-1 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2
                        ${uploadType === 'url' 
                          ? 'bg-gradient-to-r from-[#FF4B4B] to-[#FF2D2D] text-white' 
                          : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-[#FF4B4B]/20'}`}
                    >
                      <span>🔗</span>
                      Video URL
                    </button>
                  </div>

                  {uploadType === 'file' ? (
                    <div {...getRootProps()} 
                      className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300
                        ${isDragActive 
                          ? 'border-[#FF4B4B] bg-[#FF4B4B]/5' 
                          : 'border-[#FF4B4B]/30 hover:border-[#FF4B4B]/60 bg-white/5'}`}
                    >
                      <input {...getInputProps()} />
                      <div className="space-y-4">
                        <span className="text-5xl">📤</span>
                        <p className="text-xl text-gray-300">
                          {file 
                            ? file.name 
                            : isDragActive 
                              ? 'Drop your video here...' 
                              : 'Drag & drop your video or click to browse'}
                        </p>
                        <p className="text-sm text-gray-500">
                          Supports MP4, MOV, AVI, MKV
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="relative">
                        <input
                          type="url"
                          value={videoUrl}
                          onChange={(e) => setVideoUrl(e.target.value)}
                          placeholder="Enter video URL (YouTube, Vimeo, etc.)"
                          className="w-full bg-white/5 border border-[#FF4B4B]/20 rounded-xl px-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#FF4B4B]/50 focus:ring-1 focus:ring-[#FF4B4B]/50"
                        />
                        {videoUrl && (
                          <button
                            onClick={() => setVideoUrl('')}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                      <div className="text-sm text-gray-500">
                        Supported platforms: YouTube, Vimeo, Dailymotion
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'text' && (
                <div className="space-y-6">
                  {/* Single Text Content Box */}
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter your text content here..."
                    className="w-full h-48 bg-white/5 border border-[#FF4B4B]/20 rounded-xl p-6 text-white placeholder-gray-500 focus:outline-none focus:border-[#FF4B4B]/50 focus:ring-1 focus:ring-[#FF4B4B]/50 text-lg"
                  />
                  
                  {/* Additional Metadata */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-400">
                        Title
                      </label>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Content title"
                        className="w-full bg-white/5 border border-[#FF4B4B]/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#FF4B4B]/50 focus:ring-1 focus:ring-[#FF4B4B]/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-400">
                        Category
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full bg-white/5 border border-[#FF4B4B]/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FF4B4B]/50 focus:ring-1 focus:ring-[#FF4B4B]/50"
                      >
                        {categories.map((cat) => (
                          <option key={cat} value={cat} className="bg-[#0D0D0D]">
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Language Selection Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-white mb-4">3. Select Target Language</h2>
              <div className="relative">
                <select
                  value={targetLanguage}
                  onChange={(e) => setTargetLanguage(e.target.value)}
                  className="w-full bg-white/5 border border-[#FF4B4B]/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FF4B4B]/50 focus:ring-1 focus:ring-[#FF4B4B]/50"
                >
                  <option value="" disabled className="bg-[#0D0D0D]">
                    Select a language
                  </option>
                  {languages.map(lang => (
                    <option 
                      key={lang.code} 
                      value={lang.code}
                      className="bg-[#0D0D0D] py-2 px-4"
                    >
                      {lang.name}
                    </option>
                  ))}
                </select>

                {/* Selected Language Preview */}
                {targetLanguage && (
                  <div className="mt-4">
                    <span 
                      className="inline-block px-4 py-2 rounded-xl bg-gradient-to-r from-[#FF4B4B]/20 to-[#FF2D2D]/20 border border-[#FF4B4B]/30 text-white"
                    >
                      {languages.find(l => l.code === targetLanguage)?.name}
                    </span>
                  </div>
                )}
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
              disabled={isProcessing || (!text && activeTab === 'text') || (!file && activeTab === 'video') || !targetLanguage}
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
                      {activeTab === 'video' && (
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

          {/* NFT minting success message */}
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
    </div>
  )
}
