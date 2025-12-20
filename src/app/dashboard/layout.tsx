"use client";

import DashboardSidebar from "@/components/dashSidebar";
import Container from "@/components/ui/container";
import { TypographyH1 } from "@/components/ui/typography";
import { useUser } from "@clerk/nextjs";
import { Suspense } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) return null;
  if (!isSignedIn) {
    return null;
  }

  if (isSignedIn) {
    return (
      <section className="mb-5">
        <Container className="flex md:flex-col lg:flex-row px-0  border-t-2 border-t-border">
          <div className="py-5 px-1 hidden md:flex md:w-full md:flex-row lg:flex-col lg:w-52 lg:border-r-2 lg:border-r-border bg-background">
            <DashboardSidebar />
          </div>
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        </Container>
      </section>
    );
  } else {
    return (
      <section>
        <Container>
          <TypographyH1 className="text-center text-4xl font-semibold">
            You are not authorized to view this page
          </TypographyH1>
        </Container>
      </section>
    );
  }
}
