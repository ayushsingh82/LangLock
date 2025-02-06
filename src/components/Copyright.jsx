import { useState } from 'react'
import '../App.css'

export function Copyright() {
  const [searchQuery, setSearchQuery] = useState('')
  const [contentId, setContentId] = useState('')
  const [verificationResult, setVerificationResult] = useState(null)
  
  const handleSearch = async (e) => {
    e.preventDefault()
    // TODO: Implement blockchain verification logic
    setVerificationResult({
      title: "Sample Content",
      owner: "0x1234...5678",
      timestamp: "2024-03-20",
      languages: ["English", "Spanish", "French"],
      status: "Verified",
      royalties: "5%",
      transactions: [
        { date: "2024-03-19", type: "Translation", language: "Spanish" },
        { date: "2024-03-18", type: "View", region: "Mexico" }
      ]
    })
  }

  return (
    <div className="copyright-container">
      <header className="copyright-header">
        <h1>Copyright Verification</h1>
        <p className="subtitle">Verify content ownership and track usage across languages</p>
      </header>

      <div className="search-section">
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-input-group">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, owner address, or content ID"
              className="search-input"
            />
            <button type="submit" className="search-button">
              Verify
              <span className="button-icon">🔍</span>
            </button>
          </div>
        </form>
      </div>

      {verificationResult && (
        <div className="verification-result">
          <div className="result-header">
            <h2>{verificationResult.title}</h2>
            <span className={`status-badge ${verificationResult.status.toLowerCase()}`}>
              {verificationResult.status}
            </span>
          </div>

          <div className="info-grid">
            <div className="info-card">
              <h3>Owner</h3>
              <p>{verificationResult.owner}</p>
            </div>
            <div className="info-card">
              <h3>Registration Date</h3>
              <p>{verificationResult.timestamp}</p>
            </div>
            <div className="info-card">
              <h3>Royalty Rate</h3>
              <p>{verificationResult.royalties}</p>
            </div>
            <div className="info-card">
              <h3>Available Languages</h3>
              <div className="language-tags">
                {verificationResult.languages.map(lang => (
                  <span key={lang} className="language-tag">{lang}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="transaction-history">
            <h3>Transaction History</h3>
            <div className="transaction-list">
              {verificationResult.transactions.map((tx, index) => (
                <div key={index} className="transaction-item">
                  <div className="transaction-icon">
                    {tx.type === 'Translation' ? '🔄' : '👁️'}
                  </div>
                  <div className="transaction-details">
                    <h4>{tx.type}</h4>
                    <p>{tx.date}</p>
                    {tx.language && <p>Language: {tx.language}</p>}
                    {tx.region && <p>Region: {tx.region}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
