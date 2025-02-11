import { Link } from 'react-router-dom'

export function Home() {
  return (
    <div className="min-h-screen bg-[#0D0D0D] relative overflow-hidden">
      {/* Enhanced gradient overlays */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#FF4B4B]/10 via-transparent to-[#6F0000]/5"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FF4B4B]/20 rounded-full blur-[140px]"></div>
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-[#FF2D2D]/15 rounded-full blur-[120px]"></div>

      {/* Hero Section with enhanced gradients */}
      <div className="relative bg-gradient-to-br from-[#1A0000] via-[#2D0000] to-[#0D0D0D]">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNjAgMEgwdjYwaDYwVjB6TTAgMGg2MHY2MEgwVjB6IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRjRCNEIiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMC41Ii8+PC9zdmc+')] opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-8">
              <span className="block mb-4">Language AI Agent</span>
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-[#FF4B4B] to-[#FF8080]">
                Powered by Sei Network
              </span>
            </h1>
            <p className="mt-8 max-w-lg mx-auto text-xl text-gray-300 sm:max-w-3xl">
              Revolutionize content translation with AI and blockchain technology
            </p>
          </div>
        </div>
      </div>

      {/* Feature Cards with enhanced styling */}
      <div className="relative z-10 -mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {['Language AI', 'Content Ownership', 'GOAT Platform'].map((title, index) => (
            <div key={title} className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF4B4B]/20 to-[#6F0000]/20 rounded-2xl blur-xl transform group-hover:scale-105 transition-all duration-500"></div>
              <div className="relative bg-black/40 backdrop-blur-xl rounded-2xl p-8 border border-[#FF4B4B]/20 hover:border-[#FF4B4B]/40 transform hover:-translate-y-1 transition-all duration-300">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-[#FF4B4B] to-[#6F0000] rounded-2xl flex items-center justify-center shadow-lg shadow-[#FF4B4B]/20">
                    <span className="text-3xl">{['🤖', '🔐', '🚀'][index]}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
                  <p className="text-gray-400">
                    {[
                      'Advanced neural networks for natural translations across 50+ languages',
                      'Blockchain-protected content with automated royalties on Sei Network',
                      'Best-in-class platform for global content distribution'
                    ][index]}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced CTA Section */}
      <div className="text-center mt-20 relative">
        <div className="absolute inset-0 bg-[#FF4B4B]/5 blur-3xl rounded-full"></div>
        <div className="flex flex-col sm:flex-row gap-6 justify-center relative">
          <Link to="/upload" 
            className="px-8 py-4 bg-gradient-to-r from-[#FF4B4B] to-[#6F0000] text-white rounded-xl font-semibold hover:shadow-[0_0_30px_rgba(255,75,75,0.3)] transition-all duration-300">
            Start Translating
          </Link>
          <Link to="/copyright"
            className="px-8 py-4 bg-black/60 text-white rounded-xl font-semibold border border-[#FF4B4B]/30 hover:border-[#FF4B4B]/60 hover:shadow-[0_0_30px_rgba(255,75,75,0.2)] transition-all duration-300">
            Verify Ownership
          </Link>
        </div>
      </div>

      {/* Enhanced Footer */}
      <footer className="mt-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FF4B4B]/5 to-transparent blur-3xl"></div>
        <div className="relative border-t border-[#FF4B4B]/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                <h3 className="text-xl font-bold text-white mb-4">Language AI Agent</h3>
                <p className="text-gray-400 mb-4">Powered by Sei Network</p>
                <div className="flex space-x-4">
                  {['Twitter', 'GitHub'].map((platform) => (
                    <a key={platform} href="#" className="text-[#FF4B4B] hover:text-[#FF8080] transition-colors">
                      <span className="sr-only">{platform}</span>
                      {platform === 'Twitter' ? (
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                        </svg>
                      ) : (
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                        </svg>
                      )}
                    </a>
                  ))}
                </div>
              </div>
              {[
                {
                  title: 'Platform',
                  links: ['Features', 'Documentation', 'API']
                },
                {
                  title: 'Resources',
                  links: ['Blog', 'Community', 'Contact']
                }
              ].map((section) => (
                <div key={section.title}>
                  <h4 className="text-white font-semibold mb-4">{section.title}</h4>
                  <ul className="space-y-2">
                    {section.links.map((link) => (
                      <li key={link}>
                        <a href="#" className="text-gray-400 hover:text-[#FF4B4B] transition-colors">
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-8 border-t border-[#FF4B4B]/10">
              <p className="text-center text-gray-500">© 2024 Language AI Agent. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}