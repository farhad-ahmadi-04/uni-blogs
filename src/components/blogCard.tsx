import Link from "next/link";
import { TypographyH3, TypographyP } from "./ui/typography";
import { Image } from "@imagekit/next";
import { postInterface } from "@/types/postT";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
} from "./ui/card";

/**
 *
 * @returns create blog card component, that is also link to blog page
 */
function BlogCard({ post }: { post: postInterface }) {
  return (
    <Card className="pt-0 rounded-xl">
      <CardHeader className="flex items-center justify-center h-52 bg-blue-950 p-0 rounded-xl">
        <Image
          src={post.image}
          width={300}
          height={200}
          alt={post.title}
          className="w-full h-full bg-cover rounded-t-xl"
        />
      </CardHeader>
      <CardContent className="w-full">
        <Link href={`/post/${post.slug}`}>
          <TypographyH3>{post.title}</TypographyH3>
        </Link>
        <TypographyP className="first-letter:uppercase">
          {post.category}
        </TypographyP>
      </CardContent>
      <CardFooter>
        <TypographyP>
          {new Date(post.createdAt).toLocaleDateString()}
        </TypographyP>
      </CardFooter>
    </Card>
  );
}

export default BlogCard;
