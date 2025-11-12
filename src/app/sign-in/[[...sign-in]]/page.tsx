'use client'

import Container from "@/components/ui/container";
import { useTheme } from "@/hooks/useContext";
import { SignIn } from "@clerk/nextjs";
import { dark, experimental__simple } from "@clerk/themes";

export default function SignInPage() {
const {isDark} = useTheme()

  return (
    <section>
      <Container className="flex justify-center items-center mt-10">
        <SignIn appearance={{
                baseTheme: isDark ? dark : experimental__simple
              }}/>
      </Container>
    </section>
  );
}
