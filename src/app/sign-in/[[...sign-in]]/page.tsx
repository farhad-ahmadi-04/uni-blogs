import Container from "@/components/ui/container";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <section>
      <Container className="flex justify-center items-center mt-10">
        <SignIn />
      </Container>
    </section>
  );
}
