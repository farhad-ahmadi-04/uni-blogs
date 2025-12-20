"use client";

import Link from "next/link";
import Container from "./ui/container";
import { Button } from "./ui/button";
import menuItems from "@/lib/menuItem";
import { useCallback, useEffect, useState } from "react";
import { Input } from "./ui/input";
import { AnimatedThemeToggler } from "./ui/animated-theme-toggler";
import {
  SignedIn,
  SignedOut,
  SignOutButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { useTheme } from "@/hooks/useContext";
import { dark, experimental__simple } from "@clerk/themes";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { TypographyP } from "./ui/typography";

function Header() {
  const { isDark } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [searchItem, setSearchItem] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const { isSignedIn, user } = useUser();
  const [tab, setTab] = useState("");
  const url = usePathname()
  

  useEffect(() => {
    const urlParams = new URLSearchParams(searchParams);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }else {
      setTab("");
    }
  }, [searchParams]);


  const handleSearch = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const urlParams = new URLSearchParams(searchParams.toString());
      urlParams.set("searchTerm", searchItem);
      const searchQuery = urlParams.toString();
      router.push(`/search?${searchQuery}`);
    },
    [searchItem]
  );

  useEffect(() => {
    const urlParams = new URLSearchParams(searchParams.toString());
    const searchTermFormUrl = urlParams.get("searchTerm");
    if (searchTermFormUrl) setSearchItem(searchTermFormUrl);
  }, [searchParams]);

  return (
    <header className="w-full">
      <Container className="py-4 flex justify-between items-center">
        {/* mobile menu */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="text-lg flex items-center gap-2 md:hidden"
        >
          <div className="relative w-5 h-full">
            <span
              className={`absolute top-1.5 left-0 right-0 w-6 h-1 bg-primary transition-all duration-300 ${
                isOpen ? "rotate-45 -translate-y-2" : ""
              }`}
            ></span>
            <span
              className={`absolute left-0 bottom-0.5 right-0 w-6 h-1 bg-primary transition-all duration-300 ${
                isOpen ? "-rotate-45 translate-y-1" : ""
              }`}
            ></span>
          </div>
          menu
        </div>

        <nav
          className={`block md:hidden absolute z-10 left-0 right-0 top-[68px] transition-all ease-in-out duration-300 transform ${
            isOpen ? "bottom-0" : "bottom-full"
          } bg-background`}
        >
          <ul
            className={`${
              isOpen ? "opacity-100" : "opacity-0"
            } flex h-full flex-col justify-center items-center gap-4 text-2xl font-semibold`}
          >
             {/* menu of header */}
            {menuItems.map((item) => (
              <li key={item.title} onClick={() => setIsOpen(!isOpen)}>
                <Link href={item.href} className={`${url === item.href && "text-ring"}`}>{item.title}</Link>
              </li>
            ))}
             <TypographyP className="text-muted-foreground font-medium text-xl">--Dashboard menu--</TypographyP>
             {/* add dashboard menu when user is signed in and open menu */}
            {isSignedIn && (user.publicMetadata.isAdmin as boolean) && (
              <li onClick={() => setIsOpen(!isOpen)}>
                  <Link
                    href="/dashboard?tab=dash"
                    className={`${tab === "dash" && url === "/dashboard" && "text-ring"} w-full flex items-center gap-2`}
                  >
                    Dashboard
                  </Link>
              </li>
            )}
            <li onClick={() => setIsOpen(!isOpen)}>
                <Link
                  href="/dashboard?tab=profile"
                  className={`${tab === "profile" && url === "/dashboard" && "text-ring" } w-full flex items-center justify-between gap-2`}
                >
                  <div className="flex items-center gap-2">Profile</div>
                  <div className="text-sm font-medium text-muted-foreground">
                    {user?.publicMetadata?.isAdmin ? "Admin" : "User"}
                  </div>
                </Link>
            </li>
            {(user?.publicMetadata?.isAdmin as boolean) && (
              <li onClick={() => setIsOpen(!isOpen)}>
                  <Link
                    href="/dashboard?tab=posts"
                    className={`${tab === "posts" && url === "/dashboard" && "text-ring"} w-full flex items-center gap-2`}
  
                  >
                    Posts
                  </Link>
              </li>
            )}
            {(user?.publicMetadata?.isAdmin as boolean) && (
              <li onClick={() => setIsOpen(!isOpen)}>
                  <Link
                    href="/dashboard?tab=users"
                    className={`${tab === "users" && url === "/dashboard" && "text-ring"} w-full flex items-center gap-2`}
                  >
                    Users
                  </Link>
              </li>
            )}
            <li  onClick={() => setIsOpen(!isOpen)}>
                <SignOutButton />
            </li>
          </ul>
        </nav>
        <Link
          href="/"
          className="hidden md:block font-bold text-2xl lg:text-4xl"
        >
          uni-blogs
        </Link>
        {/* desktop menu */}
        <nav className="hidden md:block">
          <ul className="flex gap-8 lg:gap-10">
            {/* menu of header */}
            {menuItems.map((item) => (
              <li key={item.title} className="lg:text-lg">
                <Link href={item.href}>{item.title}</Link>
              </li>
            ))}
            {/* add dashboard link when user is signed in */}
            {isSignedIn && (
              <li className="lg:text-lg">
                <Link href={"/dashboard"}>Dashboard</Link>
              </li>
            )}
          </ul>
        </nav>
        <div>
          <div className="flex items-center gap-2">
            <form action="" onSubmit={handleSearch}>
              <Input
                placeholder="Search..."
                type="text"
                value={searchItem}
                onChange={(e) => setSearchItem(e.target.value)}
              />
            </form>
            {/* dark and light mode */}
            {/* <ModeToggle /> */}
            <AnimatedThemeToggler />
            {/* <Button variant="outline" size="icon-lg">
              <LogIn />
            </Button> */}
            <SignedOut>
              <Link href={"/sign-in"}>
                <Button variant={"outline"}>Sign in</Button>
              </Link>
            </SignedOut>
            <SignedIn>
              <UserButton
                appearance={{
                  baseTheme: isDark ? dark : experimental__simple,
                }}
                userProfileUrl="/dashboard?tab=profile"
              />
            </SignedIn>
          </div>
        </div>
      </Container>
    </header>
  );
}

export default Header;
