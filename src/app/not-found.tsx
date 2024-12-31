import Link from "next/link";

async function PageNotFound() {
  return (
    <div className="m-auto text-primary flex flex-col gap-2 w-3/5 h-screen items-center justify-center">
      <p>Page not found</p>
      <Link href={"/"} className="btn bg-primary">
        back
      </Link>
    </div>
  );
}

export default PageNotFound;
