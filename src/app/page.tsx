import BlogCard from "@/components/blogCard";
import Container from "@/components/ui/container";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { TypographyH1, TypographyP } from "@/components/ui/typography";
import { postInterface } from "@/types/postT";
import { headers } from "next/headers";

export default async function Home() {
  const headersList = headers();
  const host = (await headersList).get("host");   
  let post = [] as postInterface[];
  let error = "";
  try {
  const result = await fetch(
    host === "localhost:3000"
      ? `http://${process.env.NEXT_VERCEL_URL}/api/post/get`
      : `https://${host === process.env.NEXT_VERCEL_URL ? process.env.NEXT_VERCEL_URL : host}/api/post/get`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ limit: 9, order: "desc" }),
      cache: "no-store",
    });
    if (result.ok) {
      console.log(result);
      const data = await result.json();

      post = data.posts;
    }
    if (!result.ok) {
      console.log(result);

      error = "Failed to load post";
    }
  } catch (error) {
    console.log(error);

    error = "Failed to load post";
  }

  return (
    <>
      <section className="relative mb-10">
        <FlickeringGrid
          className="absolute overflow-hidden w-full h-[200px] inset-0 -z-10 mask-[linear-gradient(to_top,transparent_25%,black_95%)]"
          squareSize={4}
          gridGap={6}
          color="#6B7280"
          maxOpacity={0.5}
          flickerChance={0.1}
          height={300}
        />
        <Container className="space-y-10 py-4 md:py-6">
          <div>
            <TypographyH1>blogs for Developers</TypographyH1>
            <TypographyP className="text-muted-foreground">
              Explore our collection of insightful blogs tailored for
              developers, covering the latest trends, tips, and best practices
              in the tech world.
            </TypographyP>
          </div>
        </Container>
      </section>
      {/* blogs sec */}
      <section>
        <Container>
          {error && (
            <h2 className="text-3xl mt-10 p-3 text-center max-w-2xl mx-auto lg:text-4xl">
              Something went wrong please try again.
            </h2>
          )}
          {post.length === 0 && !error && (
            <h2 className="text-3xl mt-10 p-3 text-center max-w-2xl mx-auto lg:text-4xl">
              No blogs found.
            </h2>
          )}
          {post && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 overflow-hidden">
              {post.map((p) => (
                <BlogCard key={p._id} post={p} />
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
