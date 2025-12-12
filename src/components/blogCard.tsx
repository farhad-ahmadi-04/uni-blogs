import Link from "next/link";
import { TypographyH3, TypographyP } from "./ui/typography";
import { Image } from "@imagekit/next";
import { postInterface } from "@/types/postT";

/**
 *
 * @returns create blog card component, that is also link to blog page
 */
function BlogCard({ post }: { post: postInterface }) {
  return (
    <div className="border border-border">
      <div className="flex items-center justify-center h-52 bg-blue-950">
        <Image
          src={post.image}
          width={300}
          height={200}
          alt={post.title}
          className="w-full h-full bg-cover"
        />
      </div>
      <div className="p-5 space-y-4">
        <Link href={`/post/${post.slug}`}>
          <TypographyH3>{post.title}</TypographyH3>
        </Link>
        <TypographyP className="line-clamp-3">{post.category}</TypographyP>
        <TypographyP className="first-letter:uppercase">
          {new Date(post.createdAt).toLocaleDateString()}
        </TypographyP>
      </div>
    </div>
  );
}

export default BlogCard;
