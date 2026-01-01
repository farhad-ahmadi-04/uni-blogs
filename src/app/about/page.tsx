import Container from "@/components/ui/container";
import { TypographyH1, TypographyH3 } from "@/components/ui/typography";

function About() {
  return (
    <section>
      <Container>
        <TypographyH1 className="text-3xl font-bold text-center">About Us</TypographyH1>
         <p className="mt-4">
          uni-blogs is a lightweight platform for students and educators to create, share, and discover concise articles, study notes, and tutorials across university topics. It focuses on clear summaries, community-driven contributions, and easy navigation to support learning.
        </p>
        <p className="mt-3">
          Built as a minimal and extensible project, uni-blogs aims to be a starting point for learners and developers who want to collaborate on educational content, run local experiments, or extend the platform with new features.
        </p>
        <TypographyH3 className="mt-6 text-2xl font-semibold">Technologies</TypographyH3>
        <ul className="mt-2 list-disc ml-6">
          <li>Next.js (app router)</li>
          <li>React + TypeScript</li>
          <li>Tailwind CSS for styling</li>
          <li>Shadcn (design system)</li>
          <li>Node.js runtime</li>
          <li>Vercel (recommended) for deployment</li>
        </ul>
      </Container>
    </section>
  );
}

export default About;
