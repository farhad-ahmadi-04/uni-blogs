'use client'

import Container from "@/components/ui/container";
import { useTheme } from "@/hooks/useContext";
import { SignUp } from "@clerk/nextjs";
import { dark, experimental__simple } from "@clerk/themes";

export default function SignUpPage() {
const {isDark} = useTheme()

  return (
    <section>
      <Container className="flex justify-center items-center my-5">
        <SignUp appearance={{
                baseTheme: isDark ? dark : experimental__simple
              }}/>
      </Container>
    </section>
  );
}
