function Contact() {
  try {
    return (
      <section id="contact" className="py-16 bg-gray-50" data-name="contact" data-file="components/Contact.js">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">Contact Information</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-6">Get in Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[var(--primary-color)] rounded-lg flex items-center justify-center">
                    <div className="icon-mail text-xl text-white"></div>
                  </div>
                  <div>
                    <div className="font-medium text-[var(--text-primary)]">Email</div>
                    <div className="text-[var(--text-secondary)]">kelvin.yangzhiyu@outlook.com</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                    <div className="icon-map-pin text-xl text-white"></div>
                  </div>
                  <div>
                    <div className="font-medium text-[var(--text-primary)]">Location</div>
                    <div className="text-[var(--text-secondary)]">University of Texas at Dallas<br/>Hometown: Chengdu, China</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                    <div className="icon-globe text-xl text-white"></div>
                  </div>
                  <div>
                    <div className="font-medium text-[var(--text-primary)]">Languages</div>
                    <div className="text-[var(--text-secondary)]">Mandarin (Native)<br/>English (Fluent - IELTS 8.0)</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-6">Connect Online</h3>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <a href="https://github.com/KevinCL16" className="flex items-center gap-3 p-4 border border-[var(--border-color)] rounded-lg hover:bg-white hover:shadow-md transition-all">
                  <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                    <div className="icon-github text-lg text-white"></div>
                  </div>
                  <span className="font-medium text-[var(--text-primary)]">GitHub</span>
                </a>
                
                <a href="https://scholar.google.com/citations?user=KLbbYf0AAAAJ&hl=en" className="flex items-center gap-3 p-4 border border-[var(--border-color)] rounded-lg hover:bg-white hover:shadow-md transition-all">
                  <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center">
                    <div className="icon-graduation-cap text-lg text-white"></div>
                  </div>
                  <span className="font-medium text-[var(--text-primary)]">Google Scholar</span>
                </a>
              </div>
              
              <div className="academic-card">
                <h4 className="font-semibold text-[var(--text-primary)] mb-3">Interested in Research Collaboration?</h4>
                <p className="text-[var(--text-secondary)] mb-4">
                  I'm excited to connect with fellow researchers and explore opportunities in AI, NLP, 
                  and LLM research. Let's discuss interesting projects together!
                </p>
                <a href="mailto:kelvin.yangzhiyu@outlook.com" className="inline-flex items-center gap-2 bg-[var(--primary-color)] text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  <div className="icon-send text-lg"></div>
                  Send Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Contact component error:', error);
    return null;
  }
}
