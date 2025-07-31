function Hero() {
  try {
    return (
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16" data-name="hero" data-file="components/Hero.js">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4">
                Zhiyu Yang 🏎️⚽🤖
              </h1>
              <h2 className="text-xl md:text-2xl text-[var(--secondary-color)] mb-6">
                Ph.D. Student @ University of Texas at Dallas
              </h2>
              <p className="text-lg text-[var(--text-secondary)] mb-8 leading-relaxed">Excited for the future of AI, want to be a part of it! 

Ph.D. @ UTD, 

Prev. RA @ Singapore Management University, 

Prev. Research Intern @ THUNLP.</p>
              <div className="flex flex-wrap gap-4">
                <a href="mailto:kelvin.yangzhiyu@outlook.com" className="inline-flex items-center gap-2 bg-[var(--primary-color)] text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                  <div className="icon-mail text-lg"></div>
                  Contact Me
                </a>
                <a href="https://github.com/KevinCL16" className="inline-flex items-center gap-2 border border-[var(--primary-color)] text-[var(--primary-color)] px-6 py-3 rounded-lg hover:bg-[var(--primary-color)] hover:text-white transition-colors">
                  <div className="icon-github text-lg"></div>
                  GitHub
                </a>
                <a href="https://scholar.google.com/citations?user=KLbbYf0AAAAJ&hl=en" className="inline-flex items-center gap-2 border border-[var(--primary-color)] text-[var(--primary-color)] px-6 py-3 rounded-lg hover:bg-[var(--primary-color)] hover:text-white transition-colors">
                  <div className="icon-graduation-cap text-lg"></div>
                  Google Scholar
                </a>
              </div>
            </div>
            
            <div className="flex-shrink-0">
              <div className="relative">
                <img 
                  
                  
                 
                 src="https://app.trickle.so/storage/app/portrait.jpg" alt="Zhiyu Yang" className="w-64 h-64 rounded-full object-cover shadow-lg border-4 border-white"/>
                <div className="absolute -bottom-4 -right-4 bg-[var(--primary-color)] text-white p-3 rounded-full shadow-lg">
                  <div className="icon-graduation-cap text-xl"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Hero component error:', error);
    return null;
  }
}