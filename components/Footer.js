function Footer() {
  try {
    return (
      <footer className="bg-[var(--text-primary)] text-white py-8" data-name="footer" data-file="components/Footer.js">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-gray-300">
                © 2024 Zhiyu Yang. All rights reserved.
              </p>
              <p className="text-gray-400 text-sm mt-1">
                Ph.D. Student in Computer Science
              </p>
            </div>
            
            <div className="flex items-center gap-6">
              <a href="https://github.com/KevinCL16" className="text-gray-300 hover:text-white transition-colors">
                <div className="icon-github text-xl"></div>
              </a>
              <a href="https://scholar.google.com/citations?user=KLbbYf0AAAAJ&hl=en" className="text-gray-300 hover:text-white transition-colors">
                <div className="icon-graduation-cap text-xl"></div>
              </a>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-6 pt-6 text-center">
            <p className="text-gray-400 text-sm">
              Last updated: January 2025 | Built with modern web technologies
            </p>
          </div>
        </div>
      </footer>
    );
  } catch (error) {
    console.error('Footer component error:', error);
    return null;
  }
}