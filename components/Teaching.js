function Teaching() {
  try {
    const courses = [
      {
        code: "CS 229",
        title: "Machine Learning",
        semester: "Fall 2023",
        level: "Graduate",
        students: 85
      },
      {
        code: "CS 106A",
        title: "Programming Methodology",
        semester: "Spring 2023",
        level: "Undergraduate",
        students: 120
      },
      {
        code: "CS 224N",
        title: "Natural Language Processing",
        semester: "Winter 2023",
        level: "Graduate",
        students: 65
      }
    ];

    return (
      <section id="teaching" className="py-16 bg-white" data-name="teaching" data-file="components/Teaching.js">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">Teaching</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-6">Current Courses</h3>
              <div className="space-y-4">
                {courses.map((course, index) => (
                  <div key={index} className="academic-card">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-[var(--text-primary)]">{course.code}: {course.title}</h4>
                        <p className="text-[var(--text-secondary)] text-sm">{course.semester}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        course.level === 'Graduate' 
                          ? 'bg-purple-100 text-purple-800' 
                          : 'bg-orange-100 text-orange-800'
                      }`}>
                        {course.level}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                      <div className="icon-users text-lg"></div>
                      <span>{course.students} students enrolled</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-6">Teaching Philosophy</h3>
              <div className="space-y-4 text-[var(--text-secondary)] mb-8">
                <p>
                  I believe in fostering an interactive and engaging learning environment where students 
                  can explore complex concepts through hands-on experience and collaborative problem-solving.
                </p>
                <p>
                  My teaching approach emphasizes both theoretical foundations and practical applications, 
                  ensuring students develop both deep understanding and real-world skills.
                </p>
              </div>
              
              <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-6">Student Supervision</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-[var(--primary-color)]">12</div>
                  <div className="text-sm text-[var(--text-secondary)]">PhD Students</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">25</div>
                  <div className="text-sm text-[var(--text-secondary)]">MS Students</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">8</div>
                  <div className="text-sm text-[var(--text-secondary)]">Postdocs</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">45</div>
                  <div className="text-sm text-[var(--text-secondary)]">Graduated</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Teaching component error:', error);
    return null;
  }
}