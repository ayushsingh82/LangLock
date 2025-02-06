import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { Home } from './components/Home.jsx'
import { Upload } from './components/Upload.jsx'
import { Copyright } from './components/Copyright.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="upload" element={<Upload />} />
          <Route path="copyright" element={<Copyright />} />
          {/* Add more routes here later */}
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
