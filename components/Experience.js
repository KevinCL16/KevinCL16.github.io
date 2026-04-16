function Experience() {
  try {
    const experiences = [
      {
        period: "2024.09 - 2025.03",
        title: "Research Assistant",
        organization: "Singapore Management University",
        bullets: [
          "Advisor: Prof. Yang Deng.",
          "Developed benchmarks for evaluating LLMs on identifying and reproducing debugger information for multiple and multi-hop logical errors in data analysis code.",
          "This work was later published at EMNLP 2025 Main -- Oral."
        ]
      },
      {
        period: "2024.04 - 2024.07",
        title: "Research Intern",
        organization: "ModelBest Co., Ltd. & OpenBMB",
        bullets: [
          "Worked on the initial phase of the LLM×MapReduce framework for adapting regular LLMs to long-context inputs.",
          "Served as a team leader, devised research plans, guided interns, and collaborated with senior interns."
        ]
      },
      {
        period: "2023.04 - 2024.07",
        title: "Research Intern",
        organization: "THUNLP, Tsinghua University",
        bullets: [
          "Advisor: Dr. Shuo Wang.",
          "Worked on MatPlotAgent for agentic scientific visualization and UltraLink for multilingual supervised fine-tuning data.",
          "Led research planning and coordinated co-authors throughout the research process."
        ]
      }
    ];

    return (
      <section id="experience" className="section-block" data-name="experience" data-file="components/Experience.js">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">Research Experience</h2>
          <div className="space-y-6">
            {experiences.map((item, index) => (
              <div key={index} className="academic-card">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-xl font-semibold text-[var(--text-primary)]">{item.title}</h3>
                    <p className="text-[var(--text-secondary)]">{item.organization}</p>
                  </div>
                  <div className="text-sm text-[var(--text-secondary)]">{item.period}</div>
                </div>
                <ul className="content-list list-disc pl-5">
                  {item.bullets.map((bullet, bulletIndex) => (
                    <li key={bulletIndex}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Experience component error:', error);
    return null;
  }
}
