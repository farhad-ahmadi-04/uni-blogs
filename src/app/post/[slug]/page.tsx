import RecentPosts from "@/components/recentPost";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { TypographyH1 } from "@/components/ui/typography";
import { postInterface } from "@/types/postT";
import { Image } from "@imagekit/next";
import Link from "next/link";

export default async function PostPage({ params }:{
  params: Promise<{ slug: string }>
}) {
    const { slug } = await params
  let post = {} as postInterface;
  let error = ""
  try {
    const result = await fetch(process.env.VERCEL_URL + "/api/post/get", {
      method: "POST",
      body: JSON.stringify({ slug: slug }),
      cache: "no-store",
    });
    const data = await result.json();
    console.log(data);
    
    post = data.posts[0];
  } catch (error) {
    error =  "Failed to load post" ;
  }
  if (!post || error === "Failed to load post") {
    return (
      <section>
        <Container>
          <h2 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
            Post not found
          </h2>
        </Container>
      </section>
    );
  }
  return (
    <section >
        <Container className="p-3 flex flex-col">
      <TypographyH1 className="mt-10 p-3 text-center">
        {post.title}
      </TypographyH1>
      <Link
        href={`/search?category=${post.category}`}
        className="self-center mt-5"
      >
        <Button variant="outline">
          {post.category}
        </Button>
      </Link>
      <Image
        src={post.image}
        alt={post.title}
        width={400}
        height={400}
        className="mt-10 p-3 max-h-[600px] w-full object-cover"
      />
      <div className="flex justify-between p-3 border-b border-border mx-auto w-full max-w-3xl text-xs">
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        <span className="italic">
          {(post?.content?.length / 1000).toFixed(0)} mins read
        </span>
      </div>
      <div
        className="p-3 max-w-3xl mx-auto w-full post-content"
        dangerouslySetInnerHTML={{ __html: post?.content }}
      ></div>
      <RecentPosts limit={3} />
      </Container>
    </section>
  );
}
