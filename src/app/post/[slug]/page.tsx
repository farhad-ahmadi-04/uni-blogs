import RecentPosts from "@/components/recentPost";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { TypographyH1 } from "@/components/ui/typography";
import { DEFAULT_IMAGE, DEFAULT_IMAGE_ALT } from "@/lib/constants";
import { postInterface } from "@/types/postT";
import { Image } from "@imagekit/next";
import Link from "next/link";

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let post: postInterface | null = null;
  let error = "";
  try {
    const result = await fetch(`http://${process.env.NEXT_VERCEL_URL}/api/post/get`, {
      method: "POST",
      body: JSON.stringify({ slug: slug }),
      cache: "no-store",
    });
    if (!result.ok) {        
     return error = "Failed to load post";
    }
    if (result.ok) {
      const data = await result.json();      
      post = data?.posts?.[0];      
    }
  } catch (error) {
    error = "Failed to load post";
  }

  if (!post) {
    return (
      <section>
        <Container>
          <h2 className="text-3xl mt-10 p-3 text-center max-w-2xl mx-auto lg:text-4xl">
            Post not found
          </h2>
        </Container>
      </section>
    );
  }
  if (error) {
    return (
      <section>
        <Container>
          <h2 className="text-3xl mt-10 p-3 text-center max-w-2xl mx-auto lg:text-4xl">
            {error}
          </h2>
        </Container>
      </section>
    );
  }
  return (
    <section>
      <Container className="p-3 flex flex-col">
        <TypographyH1 className="mt-10 p-3 text-center">
          {post.title}
        </TypographyH1>
        <Link
          href={`/search?category=${post.category}`}
          className="self-center mt-5"
        >
          <Button variant="outline">{post.category}</Button>
        </Link>
        <Image
          src={post.image || DEFAULT_IMAGE}
          alt={post.title || DEFAULT_IMAGE_ALT}
          width={400}
          height={400}
          className="mt-10 p-3 max-h-[600px] w-full object-cover"
        />
        <div className="flex justify-between p-3 border-b border-border mx-auto w-full max-w-3xl text-xs">
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          <span className="italic">
            {post.content
              ? `${Math.ceil(post.content.length / 1000)} mins read`
              : ""}
          </span>
        </div>
        {typeof post.content === "string" ? (
          <div
            className="p-3 max-w-3xl mx-auto w-full post-content"
            dangerouslySetInnerHTML={{ __html: post?.content }}
          ></div>
        ) : (
          ""
        )}

        <RecentPosts limit={3} />
      </Container>
    </section>
  );
}
