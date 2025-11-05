import BlogCard from "@/components/blogCard";
import BlogCategory from "@/components/blogCategory";
import Container from "@/components/ui/container";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import {
  TypographyH1,
  TypographyP,
} from "@/components/ui/typography";

export default function Home() {
  return (
    <>
      <section className="relative">
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
          <div className="flex items-center flex-wrap gap-2">
            <BlogCategory count={10} name="all" />
            <BlogCategory count={1} name="animation" />
            <BlogCategory count={1} name="landing page examples" />
            <BlogCategory count={3} name="mobile" />
            <BlogCategory count={1} name="portfolio" />
            <BlogCategory count={2} name="react" />
            <BlogCategory count={1} name="react native" />
            <BlogCategory count={1} name="ui frameworks" />
          </div>
        </Container>
      </section>
      {/* blogs sec */}
      <section>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative overflow-hidden">
            <BlogCard/>
            <BlogCard/>
            <BlogCard/>
            <BlogCard/>
            <BlogCard/>
            <BlogCard/>
          </div>
        </Container>
      </section>
    </>
  );
}
