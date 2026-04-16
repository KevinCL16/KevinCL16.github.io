function Header() {
  try {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const scrollToSection = (sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      setIsMenuOpen(false);
    };

    return (
      <header className="bg-white/95 backdrop-blur border-b border-[var(--border-color)] sticky top-0 z-50" data-name="header" data-file="components/Header.js">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <button onClick={() => scrollToSection('home')} className="text-xl font-bold text-[var(--text-primary)]">
                Zhiyu Yang
              </button>
            </div>
            
            <nav className="hidden md:flex space-x-4">
              <button onClick={() => scrollToSection('home')} className="nav-link">Home</button>
              <button onClick={() => scrollToSection('news')} className="nav-link">News</button>
              <button onClick={() => scrollToSection('about')} className="nav-link">About</button>
              <button onClick={() => scrollToSection('publications')} className="nav-link">Publications</button>
              <button onClick={() => scrollToSection('experience')} className="nav-link">Experience</button>
              <button onClick={() => scrollToSection('contact')} className="nav-link">Contact</button>
            </nav>

            <button 
              className="md:hidden p-2 rounded-md hover:bg-[var(--hover-color)]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="icon-menu text-xl text-[var(--text-primary)]"></div>
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-[var(--border-color)]">
              <div className="flex flex-col space-y-2">
                <button onClick={() => scrollToSection('home')} className="nav-link text-left">Home</button>
                <button onClick={() => scrollToSection('news')} className="nav-link text-left">News</button>
                <button onClick={() => scrollToSection('about')} className="nav-link text-left">About</button>
                <button onClick={() => scrollToSection('publications')} className="nav-link text-left">Publications</button>
                <button onClick={() => scrollToSection('experience')} className="nav-link text-left">Experience</button>
                <button onClick={() => scrollToSection('contact')} className="nav-link text-left">Contact</button>
              </div>
            </div>
          )}
        </div>
      </header>
    );
  } catch (error) {
    console.error('Header component error:', error);
    return null;
  }
}