import Container from "@/components/ui/container";
import { TypographyH1, TypographyH3 } from "@/components/ui/typography";

function About() {
  return (
    <section>
      <Container>
        <TypographyH1 className="text-4xl font-bold text-center mb-8">About Us</TypographyH1>
        
        <div className="max-w-2xl mx-auto space-y-6">
          <p className="text-lg text-muted-foreground leading-relaxed">
            uni-blogs is a lightweight platform for students and educators to create, share, and discover concise articles, study notes, and tutorials across university topics. It focuses on clear summaries, community-driven contributions, and easy navigation to support learning.
            it also can be useful toward students who try to learn basics of programming.
          </p>
          
          <p className="text-lg text-muted-foreground leading-relaxed">
            Built as a minimal and extensible project, uni-blogs aims to be a starting point for learners and developers who want to collaborate on educational content, run local experiments, or extend the platform with new features.
          </p>

          <div className="border-t pt-8 mt-8">
            <TypographyH3 className="text-2xl font-semibold mb-4">Technologies</TypographyH3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <li className="flex items-center gap-2">
          <span className="text-primary">•</span>
          <span>Next.js (app router)</span>
              </li>
              <li className="flex items-center gap-2">
          <span className="text-primary">•</span>
          <span>React + TypeScript</span>
              </li>
              <li className="flex items-center gap-2">
          <span className="text-primary">•</span>
          <span>Tailwind CSS for styling</span>
              </li>
              <li className="flex items-center gap-2">
          <span className="text-primary">•</span>
          <span>Shadcn (design system)</span>
              </li>
              <li className="flex items-center gap-2">
          <span className="text-primary">•</span>
          <span>Node.js runtime</span>
              </li>
              <li className="flex items-center gap-2">
          <span className="text-primary">•</span>
          <span>Vercel (recommended) for deployment</span>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default About;
