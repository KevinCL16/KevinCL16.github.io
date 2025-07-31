function Publications() {
  try {
    const publications = [
      {
        title: "Why Stop at One Error? Benchmarking LLMs as Data Science Code Debuggers for Multi-Hop and Multi-Bug Errors",
        authors: "Zhiyu Yang, Shuo Wang, Yukun Yan, Yang Deng",
        venue: "Preprint (First Author)",
        year: "2024",
        type: "Preprint",
        link: "https://arxiv.org/abs/2503.22388",
        summary: "Introduced DSDBench, a challenging benchmark built via an automated framework to test LLMs on realistic data science code with multiple, multi-hop bugs. Our findings reveal that even top models struggle to trace error origins and achieve complete bug detection, exposing a critical gap in their reasoning and debugging capabilities."
      },
      {
        title: "MatPlotAgent: Method and Evaluation for LLM-Based Agentic Scientific Data Visualization",
        authors: "Zhiyu Yang, Zihan Zhou, Shuo Wang, Xin Cong, Xu Han, Yukun Yan, Zhenghao Liu, Zhixing Tan, Pengyuan Liu, Dong Yu, Zhiyuan Liu, Xiaodong Shi, Maosong Sun",
        venue: "ACL 2024 Findings (First Author)",
        year: "2024",
        type: "Conference",
        link: "https://arxiv.org/abs/2402.11453",
        summary: "Introduced MatPlotBench for automatic evaluation of AI methods for scientific data visualization. Proposed MatPlotAgent, a framework using visual feedback to enhance LLM performance."
      },
      {
        title: "UltraLink: An Open-Source Knowledge-Enhanced Multilingual Supervised Fine-tuning Dataset",
        authors: "Haoyu Wang, Shuo Wang, Yukun Yan, Xujia Wang, Zhiyu Yang, Yuzhuang Xu, Zhenghao Liu, Liner Yang, Ning Ding, Xu Han, Zhiyuan Liu, Maosong Sun",
        venue: "ACL 2024 (Fifth Author)",
        year: "2024",
        type: "Conference",
        link: "https://arxiv.org/abs/2402.04588",
        summary: "Developed a multilingual SFT dataset with language-specific and language-agnostic subsets using knowledge-enhanced data augmentation methods with Wikipedia as knowledge source."
      },
      {
        title: "Enhancing Free-Form Table Question Answering Models by Distilling Relevant-Cell-Based Rationales",
        authors: "Zhiyu Yang, Shuo Wang, Yukun Yan, Pengyuan Liu, Dong Yu",
        venue: "CCL 2024 (First Author)",
        year: "2024",
        type: "Conference",
        link: "https://aclanthology.org/2024.ccl-1.75/",
        summary: "Proposed a knowledge distillation method for table QA tasks using relevant-cell-based rationales, achieving SOTA results on the FeTaQA benchmark."
      }
    ];

    return (
      <section id="publications" className="py-16 bg-gray-50" data-name="publications" data-file="components/Publications.js">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">Recent Publications</h2>
          
          <div className="space-y-6">
            {publications.map((pub, index) => (
              <div key={index} className="academic-card publication-item">
                <div className="flex-1">
                  <a href={pub.link} target="_blank" rel="noopener noreferrer">
                    <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2 hover:text-[var(--primary-color)] cursor-pointer">
                      {pub.title}
                    </h3>
                  </a>
                  <p className="text-[var(--text-secondary)] mb-2">{pub.authors}</p>
                  <div className="flex items-center gap-4 text-sm mb-3">
                    <span className="text-[var(--primary-color)] font-medium">{pub.venue}</span>
                    <span className="text-[var(--text-secondary)]">{pub.year}</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      pub.type === 'Conference' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {pub.type}
                    </span>
                  </div>
                  {pub.summary && (
                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                      <strong>Summary:</strong> {pub.summary}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    );
  } catch (error) {
    console.error('Publications component error:', error);
    return null;
  }
}