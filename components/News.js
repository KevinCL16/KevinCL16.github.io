function News() {
  try {
    const newsItems = [
      {
        date: "2026.02",
        text: (
          <>
            <strong>CompactRAG</strong> was accepted to <strong>WWW 2026</strong>.
          </>
        )
      },
      {
        date: "2025.09",
        text: (
          <>
            Started my Ph.D. in Computer Science at the <strong>University of Texas at Dallas</strong>.
          </>
        )
      },
      {
        date: "2025.03",
        text: (
          <>
            <strong>Why Stop at One Error?</strong> was accepted to <strong>EMNLP 2025 Main</strong> as an <strong>Oral</strong> presentation.
          </>
        )
      },
      {
        date: "2024.02",
        text: (
          <>
            <strong>MatPlotAgent</strong> was published in <strong>ACL 2024 Findings</strong>.
          </>
        )
      }
    ];

    return (
      <section id="news" className="section-block" data-name="news" data-file="components/News.js">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">News</h2>
          <div className="academic-card">
            <ul className="content-list">
              {newsItems.map((item, index) => (
                <li key={index} className="flex flex-col md:flex-row md:gap-4">
                  <span className="font-semibold text-[var(--text-primary)] min-w-[84px]">{item.date}</span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('News component error:', error);
    return null;
  }
}
