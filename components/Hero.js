function Hero() {
  try {
    return (
      <section id="home" className="section-block pt-16 pb-10" data-name="hero" data-file="components/Hero.js">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="academic-card flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4">
                Zhiyu Yang
              </h1>
              <h2 className="text-xl md:text-2xl text-[var(--secondary-color)] mb-6">
                Ph.D. Student, University of Texas at Dallas
              </h2>
              <p className="text-lg text-[var(--text-secondary)] mb-4 leading-relaxed">
                I am a Ph.D. student in Computer Science at the University of Texas at Dallas. Previously, I worked as a
                Research Assistant at Singapore Management University and as a Research Intern at THUNLP, Tsinghua University,
                and ModelBest \&amp; OpenBMB.
              </p>
              <p className="text-lg text-[var(--text-secondary)] mb-8 leading-relaxed">
                My research interests include Natural Language Processing, Large Language Models, LLM Agents,
                Multimodal LLMs, Code LLMs, Long Context Modeling, and Human-AI Interaction.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="mailto:kelvin.yangzhiyu@outlook.com" className="inline-flex items-center gap-2 bg-[var(--text-primary)] text-white px-5 py-3 rounded-lg hover:bg-slate-800 transition-colors">
                  <div className="icon-mail text-lg"></div>
                  Email
                </a>
                <a href="https://github.com/KevinCL16" className="inline-flex items-center gap-2 border border-[var(--border-color)] text-[var(--text-primary)] px-5 py-3 rounded-lg hover:bg-[var(--hover-color)] transition-colors">
                  <div className="icon-github text-lg"></div>
                  GitHub
                </a>
                <a href="https://scholar.google.com/citations?user=KLbbYf0AAAAJ&hl=en" className="inline-flex items-center gap-2 border border-[var(--border-color)] text-[var(--text-primary)] px-5 py-3 rounded-lg hover:bg-[var(--hover-color)] transition-colors">
                  <div className="icon-graduation-cap text-lg"></div>
                  Google Scholar
                </a>
                <a href="https://www.linkedin.com/in/zhiyu-yang-81b9961aa/" className="inline-flex items-center gap-2 border border-[var(--border-color)] text-[var(--text-primary)] px-5 py-3 rounded-lg hover:bg-[var(--hover-color)] transition-colors">
                  <div className="icon-globe text-lg"></div>
                  Homepage
                </a>
              </div>
            </div>
            
            <div className="flex-shrink-0">
              <div className="relative">
                <img 
                 src="https://app.trickle.so/storage/app/portrait.jpg" alt="Zhiyu Yang" className="w-56 h-56 md:w-64 md:h-64 rounded-2xl object-cover shadow-sm border border-[var(--border-color)]"/>
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