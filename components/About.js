function About() {
  try {
    const researchAreas = [
      "Natural Language Processing",
      "Large Language Models",
      "LLM Agents",
      "Multimodal LLMs",
      "Code LLMs",
      "Long Context Modeling",
      "Human-AI Interaction"
    ];

    return (
      <section id="about" className="section-block" data-name="about" data-file="components/About.js">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">About</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="academic-card h-full">
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-4">Biography</h3>
                <div className="space-y-4 text-[var(--text-secondary)]">
                  <p>
                    I am a Ph.D. student in Computer Science at the University of Texas at Dallas,
                    advised by Prof. Jessica Ouyang.
                    My research focuses on large language models and their applications in coding,
                    multimodality, long-context modeling, and agent systems.
                  </p>
                  <p>
                    I received my M.Eng. in Computer Science and Technology from Beijing Language and Culture University in 2024
                    and my B.Eng. in Computer Science and Technology from Sichuan University in 2021.
                  </p>
                  <p>
                    Previously, I worked as a Research Assistant at Singapore Management University,
                    and as a Research Intern at THUNLP, Tsinghua University, and ModelBest &amp; OpenBMB.
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <div className="academic-card mb-6">
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-4">Research Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {researchAreas.map((area, index) => (
                    <span key={index} className="bg-blue-50 text-[var(--primary-color)] px-3 py-2 rounded-full text-sm font-medium">
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              <div className="academic-card mb-6">
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-4">Education</h3>
                <ul className="content-list">
                  <li><strong>2025.09 - Present</strong>, Ph.D. in Computer Science, University of Texas at Dallas, advised by Prof. Jessica Ouyang.</li>
                  <li><strong>2021.09 - 2024.07</strong>, M.Eng. in Computer Science and Technology, Beijing Language and Culture University.</li>
                  <li><strong>2017.09 - 2021.07</strong>, B.Eng. in Computer Science and Technology, Sichuan University.</li>
                </ul>
              </div>

              <div className="academic-card">
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-4">Academic Services &amp; Projects</h3>
                <ul className="content-list">
                  <li><strong>ACL ARR Reviewer</strong>, 2024 - present. Invited by ACL ARR 2024 October for emergency reviewing and currently serving as a regular reviewer.</li>
                  <li><strong>CCL 2024 System Demonstration</strong>. Presented MatPlotAgent and developed a live web demo using Flask, HTML, and CSS.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('About component error:', error);
    return null;
  }
}