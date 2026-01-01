import BlogCard from "@/components/blogCard";
import Container from "@/components/ui/container";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import {
  TypographyH1,
  TypographyP,
} from "@/components/ui/typography";
import { postInterface } from "@/types/postT";

export default async function Home() {
let post = [] as postInterface[];
  let error = ""
  try {
    const result = await fetch(process.env.VERCEL_URL + "/api/post/get", {
      method: "POST",
      body: JSON.stringify({ limit: 9, order: 'desc' }),
      cache: "no-store",
    });    
    if(result.ok){
      const data = await result.json();
      post = data.posts;
    }
    if(!result.ok){
      error = "Failed to load post"
    }
  } catch (error) {
    error =  "Failed to load post" ;
  }

  if (!post || error === "Failed to load post") {
    return (
      <section>
        <Container>
          <h2 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
            Something went wrong please try again.
          </h2>
        </Container>
      </section>
    );
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
              Latest news and updates
            </TypographyP>
          </div>
        </Container>
      </section>
      {/* blogs sec */}
      <section>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 overflow-hidden">
            {post.map(p=> <BlogCard key={p._id} post={p} />)}
          </div>
        </Container>
      </section>
    </>
  );
}
