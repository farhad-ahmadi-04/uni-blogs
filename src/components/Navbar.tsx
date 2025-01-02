"use client"
import { useEffect, useState } from 'react';
import Link from 'next/link';
import ThemeSwitch from './ThemeSwitcher';

export default function Navbar() {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 250) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`navbar z-50 ${isSticky ? 'fixed top-0 left-0 w-full  bg-secondary-200' : ''}`}>
      <div className="navbar-start flex justify-between w-full">
        <h1 className="font-bold text-2xl text-primary">Daily thoughts</h1>
        <div className="dropdown dropdown-end lg:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 rotate-180"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className={`bg-secondary-200  menu menu-sm dropdown-content dropdown-left rounded-box z-10 mt-3 w-52 p-2 shadow`}
          >
            <li>
              <Link href={'/'}>Home</Link>
            </li>
            <li>
              <Link href={'/'}>About</Link>
            </li>
            <li>
              <Link href={'/'}>Github</Link>
            </li>
            <li>
              <ThemeSwitch />
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-end hidden lg:flex">
        <ul className="menu menu-horizontal p-0">
          <li>
            <Link href={'/'}>Home</Link>
          </li>
          <li>
            <Link href={'/'}>About</Link>
          </li>
          <li>
            <Link href={'/'}>Github</Link>
          </li>
          <li>
            <ThemeSwitch />
          </li>
        </ul>
      </div>
    </div>
  );
}
