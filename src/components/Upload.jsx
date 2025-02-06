import { useState } from 'react'
import '../App.css'

export function Upload() {
  const [contentType, setContentType] = useState('video')
  const [file, setFile] = useState(null)
  const [text, setText] = useState('')
  const [targetLanguages, setTargetLanguages] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('entertainment')
  
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

  const handleLanguageToggle = (langCode) => {
    setTargetLanguages(prev => 
      prev.includes(langCode)
        ? prev.filter(code => code !== langCode)
        : [...prev, langCode]
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // TODO: Implement upload logic
    console.log({
      contentType,
      file,
      text,
      targetLanguages,
      title,
      description,
      category
    })
  }

  return (
    <div className="upload-container">
      <h1>Upload Content</h1>
      
      <form onSubmit={handleSubmit} className="upload-form">
        <div className="form-section">
          <h2>1. Choose Content Type</h2>
          <div className="content-type-selector">
            <button
              type="button"
              className={`type-button ${contentType === 'video' ? 'active' : ''}`}
              onClick={() => setContentType('video')}
            >
              <span className="icon">🎥</span>
              Video
            </button>
            <button
              type="button"
              className={`type-button ${contentType === 'text' ? 'active' : ''}`}
              onClick={() => setContentType('text')}
            >
              <span className="icon">📝</span>
              Text
            </button>
          </div>
        </div>

        <div className="form-section">
          <h2>2. Add Your Content</h2>
          {contentType === 'video' ? (
            <div className="file-upload-area">
              <input
                type="file"
                accept="video/*"
                onChange={(e) => setFile(e.target.files[0])}
                id="video-upload"
                className="file-input"
              />
              <label htmlFor="video-upload" className="file-label">
                <span className="icon">📤</span>
                {file ? file.name : 'Drop your video here or click to browse'}
              </label>
            </div>
          ) : (
            <textarea
              placeholder="Enter your text content here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="text-input"
            />
          )}
        </div>

        <div className="form-section">
          <h2>3. Content Details</h2>
          <div className="input-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter content title"
              required
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your content"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-section">
          <h2>4. Select Target Languages</h2>
          <div className="language-grid">
            {languages.map(lang => (
              <label key={lang.code} className="language-option">
                <input
                  type="checkbox"
                  checked={targetLanguages.includes(lang.code)}
                  onChange={() => handleLanguageToggle(lang.code)}
                />
                <span className="language-name">{lang.name}</span>
              </label>
            ))}
          </div>
        </div>

        <button type="submit" className="submit-button">
          Start Translation
          <span className="button-icon">→</span>
        </button>
      </form>
    </div>
  )
}
