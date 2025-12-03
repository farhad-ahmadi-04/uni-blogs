"use client";
import Container from "@/components/ui/container";
import { useUser } from "@clerk/nextjs";
import CreatePostForm from "./createPostForm";

function CreatePostPage() {
  const { isSignedIn, user, isLoaded } = useUser();

  if (!isLoaded) return null;

  if (isSignedIn && user.publicMetadata.isAdmin) {
    return (
      <section>
        <Container className="flex flex-col items-center gap-6">
          <h1 className="text-center text-2xl font-semibold">Create a post</h1>
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

export default CreatePostPage;
