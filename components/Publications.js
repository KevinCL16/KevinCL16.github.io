function Publications() {
  try {
    const publicationGroups = [
      {
        year: "2026",
        items: [
          {
            title: "CompactRAG: Reducing LLM Calls and Token Overhead in Multi-Hop Question Answering",
            authors: "Hao Yang, Zhiyu Yang, Xupeng Zhang, Wei Wei, Yunjie Zhang, Lin Yang",
            venue: "WWW 2026",
            link: "https://arxiv.org/abs/2602.05728"
          }
        ]
      },
      {
        year: "2025",
        items: [
          {
            title: "Why Stop at One Error? Benchmarking LLMs as Data Science Code Debuggers for Multi-Hop and Multi-Bug Errors",
            authors: "Zhiyu Yang, Shuo Wang, Yukun Yan, Yang Deng",
            venue: "EMNLP 2025 Main -- Oral",
            link: "https://aclanthology.org/2025.emnlp-main.878/"
          },
          {
            title: "Rethinking the Chain-of-Thought: The Roles of In-Context Learning and Pre-trained Priors",
            authors: "Hao Yang, Zhiyu Yang, Yunjie Zhang, Shanyi Zhu, Lin Yang",
            venue: "ICIC 2025",
            link: "https://arxiv.org/abs/2509.01236"
          }
        ]
      },
      {
        year: "2024",
        items: [
          {
            title: "MatPlotAgent: Method and Evaluation for LLM-Based Agentic Scientific Data Visualization",
            authors: "Zhiyu Yang, Zihan Zhou, Shuo Wang, Xin Cong, Xu Han, Yukun Yan, Zhenghao Liu, Zhixing Tan, Pengyuan Liu, Dong Yu, Zhiyuan Liu, Xiaodong Shi, Maosong Sun",
            venue: "ACL 2024 Findings",
            link: "https://aclanthology.org/2024.findings-acl.701/"
          },
          {
            title: "UltraLink: An Open-Source Knowledge-Enhanced Multilingual Supervised Fine-tuning Dataset",
            authors: "Haoyu Wang, Shuo Wang, Yukun Yan, Xujia Wang, Zhiyu Yang, Yuzhuang Xu, Zhenghao Liu, Ning Ding, Xu Han, Zhiyuan Liu, Maosong Sun",
            venue: "ACL 2024",
            link: "https://aclanthology.org/2024.acl-long.644/"
          },
          {
            title: "Enhancing Free-Form Table Question Answering Models by Distilling Relevant-Cell-Based Rationales",
            authors: "Zhiyu Yang, Shuo Wang, Yukun Yan, Pengyuan Liu, Dong Yu",
            venue: "CCL 2024 Poster",
            link: "https://aclanthology.org/2024.ccl-1.75/"
          }
        ]
      }
    ];

    return (
      <section id="publications" className="section-block" data-name="publications" data-file="components/Publications.js">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">Publications</h2>

          <div className="academic-card space-y-8">
            {publicationGroups.map((group) => (
              <div key={group.year}>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-4">{group.year}</h3>
                <ul className="content-list">
                  {group.items.map((pub, index) => (
                    <li key={index}>
                      <span className="font-medium text-[var(--text-primary)]">{pub.venue}</span>{" "}
                      <a href={pub.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        {pub.title}
                      </a>
                      <span>. {pub.authors}</span>
                    </li>
                  ))}
                </ul>
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
