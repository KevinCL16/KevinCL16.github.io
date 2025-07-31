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
      <section id="about" className="py-16 bg-white" data-name="about" data-file="components/About.js">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 style={{"paddingTop":"0px","paddingRight":"0px","paddingBottom":"8px","paddingLeft":"0px","marginTop":"0px","marginRight":"0px","marginBottom":"24px","marginLeft":"0px","fontSize":"28px","color":"rgb(30, 41, 59)","backgroundColor":"rgba(0, 0, 0, 0)","textAlign":"start","fontWeight":"600","objectFit":"fill","display":"block","position":"static","width":"1088px","height":"40.8px","top":"auto","left":"auto","right":"auto","bottom":"auto"}} className="section-title">About Me</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 style={{"paddingTop":"0px","paddingRight":"0px","paddingBottom":"0px","paddingLeft":"0px","marginTop":"0px","marginRight":"0px","marginBottom":"16px","marginLeft":"0px","fontSize":"24px","color":"rgb(30, 41, 59)","backgroundColor":"rgba(0, 0, 0, 0)","textAlign":"start","fontWeight":"600","objectFit":"fill","display":"block","position":"static","width":"520px","height":"28px","top":"auto","left":"auto","right":"auto","bottom":"auto"}} className="text-xl font-semibold text-[var(--text-primary)] mb-4">Biography</h3>
              <div className="space-y-4 text-[var(--text-secondary)]">
                <p style={{"paddingTop":"0px","paddingRight":"50px","paddingBottom":"0px","paddingLeft":"0px","marginTop":"25px","marginRight":"0px","marginBottom":"0px","marginLeft":"0px","fontSize":"20px","color":"rgb(100, 116, 139)","backgroundColor":"rgba(0, 0, 0, 0)","textAlign":"start","fontWeight":"400","objectFit":"fill","display":"block","position":"static","width":"520px","height":"102.4px","top":"auto","left":"auto","right":"auto","bottom":"auto"}}>I am a Ph.D. student in Computer Science at University of Texas at Dallas, starting August 2025. My research focuses on Large Language Models and their applications in coding, multimodality and context engineering.</p>
                <p style={{"paddingTop":"0px","paddingRight":"50px","paddingBottom":"0px","paddingLeft":"0px","marginTop":"80px","marginRight":"0px","marginBottom":"0px","marginLeft":"0px","fontSize":"20px","color":"rgb(100, 116, 139)","backgroundColor":"rgba(0, 0, 0, 0)","textAlign":"start","fontWeight":"400","objectFit":"fill","display":"block","position":"static","width":"520px","height":"102.4px","top":"auto","left":"auto","right":"auto","bottom":"auto"}}>I received my M.Eng. from Beijing Language and Culture University in 2024 and B.Eng. from Sichuan University in 2021. I have research experience at Singapore Management University, THUNLP at Tsinghua University, and Modelbest Co. Ltd.</p>
                <p style={{"paddingTop":"0px","paddingRight":"50px","paddingBottom":"0px","paddingLeft":"0px","marginTop":"100px","marginRight":"0px","marginBottom":"0px","marginLeft":"0px","fontSize":"20px","color":"rgb(100, 116, 139)","backgroundColor":"rgba(0, 0, 0, 0)","textAlign":"start","fontWeight":"400","objectFit":"fill","display":"block","position":"static","width":"520px","height":"76.8px","top":"auto","left":"auto","right":"auto","bottom":"auto"}}>I'm passionate about advancing AI capabilities and excited to be part of the future of artificial intelligence. My hometown is Chengdu, China, and I enjoy F1, football, and games in my free time.</p>
              </div>
            </div>
            
            <div>
              <h3 style={{"paddingTop":"0px","paddingRight":"0px","paddingBottom":"0px","paddingLeft":"0px","marginTop":"0px","marginRight":"0px","marginBottom":"16px","marginLeft":"0px","fontSize":"28px","color":"rgb(30, 41, 59)","backgroundColor":"rgba(0, 0, 0, 0)","textAlign":"start","fontWeight":"600","objectFit":"fill","display":"block","position":"static","width":"520px","height":"28px","top":"auto","left":"auto","right":"auto","bottom":"auto"}} className="text-xl font-semibold text-[var(--text-primary)] mb-4">Research Interests</h3>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {researchAreas.map((area, index) => (
                  <div key={index} className="bg-blue-50 text-[var(--primary-color)] px-3 py-2 rounded-lg text-sm font-medium text-center">
                    {area}
                  </div>
                ))}
              </div>
              
              <h3 style={{"paddingTop":"0px","paddingRight":"0px","paddingBottom":"0px","paddingLeft":"0px","marginTop":"0px","marginRight":"0px","marginBottom":"16px","marginLeft":"0px","fontSize":"28px","color":"rgb(30, 41, 59)","backgroundColor":"rgba(0, 0, 0, 0)","textAlign":"start","fontWeight":"600","objectFit":"fill","display":"block","position":"static","width":"520px","height":"28px","top":"auto","left":"auto","right":"auto","bottom":"auto"}} className="text-xl font-semibold text-[var(--text-primary)] mb-4">Education</h3>
              <div className="space-y-4 mb-8">
                <div className="border-l-4 border-[var(--primary-color)] pl-4">
                  <h4 className="font-semibold text-[var(--text-primary)]">Ph.D. in Computer Science and Technology</h4>
                  <p className="text-[var(--text-secondary)]">University of Texas at Dallas, 2025 - now</p>
                </div>
                <div className="border-l-4 border-[var(--secondary-color)] pl-4">
                  <h4 className="font-semibold text-[var(--text-primary)]">M.Eng. in Computer Science and Technology</h4>
                  <p className="text-[var(--text-secondary)]">Beijing Language and Culture University, 2021-2024</p>
                </div>
                <div className="border-l-4 border-[var(--secondary-color)] pl-4">
                  <h4 className="font-semibold text-[var(--text-primary)]">B.Eng. in Computer Science and Technology</h4>
                  <p className="text-[var(--text-secondary)]">Sichuan University, 2017-2021</p>
                </div>
              </div>
              
              <h3 style={{"paddingTop":"0px","paddingRight":"0px","paddingBottom":"0px","paddingLeft":"0px","marginTop":"0px","marginRight":"0px","marginBottom":"16px","marginLeft":"0px","fontSize":"28px","color":"rgb(30, 41, 59)","backgroundColor":"rgba(0, 0, 0, 0)","textAlign":"start","fontWeight":"600","objectFit":"fill","display":"block","position":"static","width":"520px","height":"28px","top":"auto","left":"auto","right":"auto","bottom":"auto"}} className="text-xl font-semibold text-[var(--text-primary)] mb-4">Academic Services</h3>
              <div className="space-y-3">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-[var(--text-primary)] mb-2">ACL ARR Reviewer</h4>
                  <p className="text-[var(--text-secondary)] text-sm mb-1">2024 - 2025</p>
                  <ul className="text-[var(--text-secondary)] text-sm space-y-1">
                    <li>• Invited by ACL ARR October for Emergency Reviewing</li>
                    <li>• Reviewer for ACL ARR February and May</li>
                  </ul>
                </div>
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