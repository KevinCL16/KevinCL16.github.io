function Contact() {
  try {
    return (
      <section id="contact" className="section-block" data-name="contact" data-file="components/Contact.js">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">Contact</h2>

          <div className="academic-card">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-4">Contact Information</h3>
                <ul className="content-list">
                  <li><strong>Email:</strong> <a href="mailto:kelvin.yangzhiyu@outlook.com">kelvin.yangzhiyu@outlook.com</a></li>
                  <li><strong>Affiliation:</strong> University of Texas at Dallas</li>
                  <li><strong>Languages:</strong> Mandarin (Native), English (Fluent)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-4">Links</h3>
                <ul className="content-list">
                  <li><a href="https://github.com/KevinCL16">GitHub</a></li>
                  <li><a href="https://scholar.google.com/citations?user=KLbbYf0AAAAJ&hl=en">Google Scholar</a></li>
                  <li><a href="https://www.linkedin.com/in/zhiyu-yang-81b9961aa/">Homepage</a></li>
                </ul>
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
