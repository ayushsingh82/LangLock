import { Link } from 'react-router-dom'
import { Navbar } from './Navbar'

export function Home() {
  return (
    <div className="min-h-screen bg-[#0D0D0D] relative overflow-hidden">
      <Navbar />
      
      {/* Decorative red glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FF4B4B]/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-[#FF2D2D]/15 rounded-full blur-[100px]"></div>

      {/* Hero Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Secure Your Digital Content
            <br />
            <span className="bg-gradient-to-r from-[#FF4B4B] to-[#FF2D2D] text-transparent bg-clip-text">
              Across Languages
            </span>
          </h1>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Protect and monetize your content with blockchain-powered copyright management and seamless translation services
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/upload"
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#FF4B4B] to-[#FF2D2D] text-white font-semibold hover:shadow-[0_0_30px_rgba(255,75,75,0.3)] hover:scale-105 transition-all duration-300 border border-[#FF4B4B]/20"
            >
              Start Uploading
            </Link>
            <Link
              to="/copyright"
              className="px-8 py-4 rounded-xl bg-white/5 border border-[#FF4B4B]/20 text-white font-semibold hover:bg-white/10 transition-all duration-300"
            >
              Verify Copyright
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-8 border border-[#FF4B4B]/20 hover:border-[#FF4B4B]/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,75,75,0.15)] hover:scale-[1.02] group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#FF4B4B]/20 to-[#FF2D2D]/20 flex items-center justify-center mb-6 group-hover:shadow-[0_0_20px_rgba(255,75,75,0.2)] transition-all duration-300">
              <span className="text-2xl group-hover:scale-110 transition-all duration-300">🔒</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Secure Copyright
            </h3>
            <p className="text-gray-400">
              Register and protect your content with blockchain-based verification and immutable proof of ownership
            </p>
          </div>

          <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-8 border border-[#FF4B4B]/20 hover:border-[#FF4B4B]/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,75,75,0.15)] hover:scale-[1.02] group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#FF4B4B]/20 to-[#FF2D2D]/20 flex items-center justify-center mb-6 group-hover:shadow-[0_0_20px_rgba(255,75,75,0.2)] transition-all duration-300">
              <span className="text-2xl group-hover:scale-110 transition-all duration-300">🌐</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Global Reach
            </h3>
            <p className="text-gray-400">
              Expand your audience with AI-powered translations while maintaining copyright protection across languages
            </p>
          </div>

          <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-8 border border-[#FF4B4B]/20 hover:border-[#FF4B4B]/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,75,75,0.15)] hover:scale-[1.02] group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#FF4B4B]/20 to-[#FF2D2D]/20 flex items-center justify-center mb-6 group-hover:shadow-[0_0_20px_rgba(255,75,75,0.2)] transition-all duration-300">
              <span className="text-2xl group-hover:scale-110 transition-all duration-300">💰</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Monetization
            </h3>
            <p className="text-gray-400">
              License your content and earn royalties from translations and usage across different languages
            </p>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-white text-center mb-16">How It Works</h2>
          <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Process Steps */}
            {[
              {
                icon: "📤",
                title: "Upload Content",
                description: "Upload your text or video content to our secure platform"
              },
              {
                icon: "🔐",
                title: "Register Copyright",
                description: "Secure your content with blockchain verification"
              },
              {
                icon: "🔄",
                title: "Translate",
                description: "Get AI-powered translations in multiple languages"
              },
              {
                icon: "💎",
                title: "Monetize",
                description: "License your content and earn from translations"
              }
            ].map((step, index) => (
              <div key={index} className="relative">
                {/* Step Card */}
                <div className="text-center group hover:scale-105 transition-all duration-300">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-[#FF4B4B]/20 to-[#FF2D2D]/20 flex items-center justify-center mx-auto mb-6 group-hover:shadow-[0_0_20px_rgba(255,75,75,0.2)] transition-all duration-300">
                    <span className="text-3xl group-hover:scale-110 transition-all duration-300">{step.icon}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>

                {/* Arrow - Don't show after the last item */}
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 w-8 h-8">
                    <svg 
                      className="w-8 h-8 text-[#FF4B4B]/50" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M17 8l4 4m0 0l-4 4m4-4H3" 
                      />
                    </svg>
                  </div>
                )}
              </div>
            ))}

            {/* Mobile Arrows - Only show on small screens */}
            <div className="block md:hidden space-y-4">
              {[0, 1, 2].map((index) => (
                <div key={`arrow-${index}`} className="flex justify-center">
                  <svg 
                    className="w-6 h-6 text-[#FF4B4B]/50 transform rotate-90" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M17 8l4 4m0 0l-4 4m4-4H3" 
                    />
                  </svg>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="mt-24 border-t border-[#FF4B4B]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <img 
                  src="https://pbs.twimg.com/profile_images/1873839225914716160/w8650_qp_400x400.jpg"
                  alt="Sei Logo" 
                  className="w-8 h-8 rounded-full filter drop-shadow-[0_0_8px_rgba(255,75,75,0.3)]"
                />
                <span className="text-white font-bold text-2xl">AI</span>
              </div>
              <p className="text-gray-400 mb-6">
                Secure and translate your content across languages with blockchain protection
              </p>
              <div className="flex space-x-4">
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-lg bg-white/5 border border-[#FF4B4B]/20 flex items-center justify-center text-[#FF4B4B] hover:bg-white/10 hover:scale-110 hover:shadow-[0_0_20px_rgba(255,75,75,0.2)] transition-all duration-300"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-lg bg-white/5 border border-[#FF4B4B]/20 flex items-center justify-center text-[#FF4B4B] hover:bg-white/10 hover:scale-110 hover:shadow-[0_0_20px_rgba(255,75,75,0.2)] transition-all duration-300"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link 
                    to="/upload" 
                    className="text-gray-400 hover:text-[#FF4B4B] transition-colors hover:translate-x-1 inline-block transition-all duration-300"
                  >
                    Upload
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/copyright" 
                    className="text-gray-400 hover:text-[#FF4B4B] transition-colors hover:translate-x-1 inline-block transition-all duration-300"
                  >
                    Copyright
                  </Link>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="text-gray-400 hover:text-[#FF4B4B] transition-colors hover:translate-x-1 inline-block transition-all duration-300"
                  >
                    Documentation
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="#" 
                    className="text-gray-400 hover:text-[#FF4B4B] transition-colors hover:translate-x-1 inline-block transition-all duration-300"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="text-gray-400 hover:text-[#FF4B4B] transition-colors hover:translate-x-1 inline-block transition-all duration-300"
                  >
                    API
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="text-gray-400 hover:text-[#FF4B4B] transition-colors hover:translate-x-1 inline-block transition-all duration-300"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 pt-8 border-t border-[#FF4B4B]/10">
            <p className="text-center text-gray-500">
              © 2024 AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}