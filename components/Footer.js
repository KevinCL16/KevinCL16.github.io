function Footer() {
  try {
    return (
      <footer className="py-8" data-name="footer" data-file="components/Footer.js">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-[var(--text-secondary)]">
                © 2026 Zhiyu Yang
              </p>
              <p className="text-[var(--text-secondary)] text-sm mt-1">
                Ph.D. Student in Computer Science
              </p>
            </div>
            
            <div className="flex items-center gap-6">
              <a href="https://github.com/KevinCL16" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                <div className="icon-github text-xl"></div>
              </a>
              <a href="https://scholar.google.com/citations?user=KLbbYf0AAAAJ&hl=en" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                <div className="icon-graduation-cap text-xl"></div>
              </a>
            </div>
          </div>
          
          <div className="border-t border-[var(--border-color)] mt-6 pt-6 text-center">
            <p className="text-[var(--text-secondary)] text-sm">
              Last updated: April 2026
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
