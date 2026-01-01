"use client";
import Container from "@/components/ui/container";
import { useUser } from "@clerk/nextjs";
import CreatePostForm from "./createPostForm";

function DashCreatePost() {
  const { isSignedIn, user, isLoaded } = useUser();

  if (!isLoaded) return null;

  if (isSignedIn) {
    return (
      <section className="w-full">
        <Container className="flex justify-center mt-3">
          <CreatePostForm />
        </Container>
      </section>
    );
  } else {
    return (
      <section>
        <Container >
          <h1 className="text-center text-4xl font-semibold">
            You are not authorized to view this page
          </h1>
        </Container>
      </section>
    );
  }
}

export default DashCreatePost;
