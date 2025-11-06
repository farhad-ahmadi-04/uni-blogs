import Container from "@/components/ui/container";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <section>
      <Container className="flex justify-center items-center mt-10">
        <SignUp />
      </Container>
    </section>
  );
}
