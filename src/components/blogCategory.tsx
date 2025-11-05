import { Button } from "@/components/ui/button";

function BlogCategory({name, count}: {name:string, count:number}) {
  return (
    <Button variant={"secondary"} className="px-5 cursor-pointer">
      <span className="first-letter:uppercase">{name}</span>
      <span>{count}</span>
    </Button>
  );
}

export default BlogCategory;
