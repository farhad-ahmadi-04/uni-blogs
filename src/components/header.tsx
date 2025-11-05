"use client";

import Link from "next/link";
import Container from "./ui/container";
import { Button } from "./ui/button";
import { LogIn, PanelBottomCloseIcon, PanelTopCloseIcon } from "lucide-react";
import menuItems from "@/lib/menuItem";
import { useState } from "react";
import { Input } from "./ui/input";
import { AnimatedThemeToggler } from "./ui/animated-theme-toggler";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

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
          className={`block md:hidden absolute left-0 right-0 top-[72px] transition-all ease-in-out duration-300 transform ${
            isOpen ? "bottom-0" : "bottom-full"
          } bg-background`}
        >
          <ul
            className={`${
              isOpen ? "opacity-100" : "opacity-0"
            } flex h-full flex-col justify-center items-center gap-4 text-2xl font-semibold`}
          >
            {menuItems.map((item) => (
              <li key={item.title} onClick={() => setIsOpen(!isOpen)}>
                <Link href={item.href}>{item.title}</Link>
              </li>
            ))}
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
            {menuItems.map((item) => (
              <li key={item.title} className="lg:text-lg">
                <Link href={item.href}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <div className="flex items-center gap-2">
            <Input placeholder="Search..." />
            {/* dark and light mode */}
            {/* <ModeToggle /> */}
            <AnimatedThemeToggler />
            <Button variant="outline" size="icon-lg">
              <LogIn />
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
}

export default Header;
