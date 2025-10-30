import Link from "next/link";
import Container from "./ui/container";
import { Button } from "./ui/button";
import { LogIn, Sidebar } from "lucide-react";
import menuItems from "@/lib/menuItem";

function Header({ sidebar }: { sidebar: React.ReactNode }) {
  return (
    <header className="w-full">
      <Container className="py-4 flex justify-between items-center">
        {/* mobile */}
        <div className="md:hidden">{sidebar}</div>
        <Link href="/" className="font-bold text-2xl lg:text-4xl">
          uni-blogs
        </Link>
        {/* desktop */}
        <nav className="hidden md:block">
          <ul className="flex gap-8 lg:gap-10">
            {menuItems.map((item) => (
              <li key={item.title} className="lg:text-lg">
                <Link href={item.href}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <Button variant="outline" size="icon-lg">
            <LogIn />
          </Button>
        </div>
      </Container>
    </header>
  );
}

export default Header;
