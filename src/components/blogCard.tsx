import Link from "next/link";
import { TypographyH3, TypographyP } from "./ui/typography";

function BlogCard() {
  return (
    <Link href={"/"}>
      <div className="border border-border">
        <div className="flex items-center justify-center h-52 bg-blue-950">
          Image
        </div>
        <div className="p-5 space-y-4">
          <TypographyH3>
            21 best free react components libraries to kickstart projects
          </TypographyH3>
          <TypographyP className="line-clamp-3">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Accusantium eveniet vitae omnis aliquam! Minima accusamus
            consequuntur odit reiciendis vel nulla cum omnis necessitatibus,
          </TypographyP>
          <TypographyP className="first-letter:uppercase">
            december 1, 2024
          </TypographyP>
        </div>
      </div>
    </Link>
  );
}

export default BlogCard;
