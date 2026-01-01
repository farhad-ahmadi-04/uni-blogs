"use client";

import {
  Edit,
  LayoutDashboard,
  LogOut,
  NotepadText,
  UserPen,
  Users,
} from "lucide-react";
import { Button } from "./ui/button";
import { SignOutButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function DashboardSidebar() {
  const { user, isSignedIn, isLoaded } = useUser();
  const [tab, setTab] = useState("");
  const searchParams = useSearchParams();

  useEffect(() => {
    const urlParams = new URLSearchParams(searchParams);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [searchParams]);

  // handle not signed in state
  if (!isSignedIn) return null;
  // handle loading state
  if (!isLoaded) return null;

  if (isSignedIn && user.publicMetadata) {
    return (
      <ul className="flex md:flex-row lg:flex-col md:w-full">
        {isSignedIn && (user.publicMetadata.isAdmin as boolean) && (
          <li>
            <Button
              variant={`${tab === "dash" || !tab ? "default" : "ghost"}`}
              className="w-full"
            >
              <Link
                href="/dashboard?tab=dash"
                className="w-full flex items-center gap-2"
              >
                <LayoutDashboard />
                Dashboard
              </Link>
            </Button>
          </li>
        )}
        <li>
          <Button
            variant={`${tab === "profile" ? "default" : "ghost"}`}
            className="w-full"
          >
            <Link
              href="/dashboard?tab=profile"
              className="w-full flex items-center justify-between gap-2 "
            >
              <div className="flex items-center gap-2">
                <UserPen />
                Profile
              </div>
              <div className="text-sm font-medium text-muted-foreground">
                {user?.publicMetadata?.isAdmin ? "Admin" : "User"}
              </div>
            </Link>
          </Button>
        </li>
         {(user?.publicMetadata?.isAdmin as boolean) && (
          <li>
            <Button
              variant={tab === " create-post" ? "default" : "ghost"}
              className="w-full"
            >
              <Link
                href="/dashboard?tab=create-post"
                className="w-full flex items-center gap-2"
              >
                <Edit />
                Create post
              </Link>
            </Button>
          </li>
        )}
        {(user?.publicMetadata?.isAdmin as boolean) && (
          <li>
            <Button
              variant={tab === "posts" ? "default" : "ghost"}
              className="w-full"
            >
              <Link
                href="/dashboard?tab=posts"
                className="w-full flex items-center gap-2"
              >
                <NotepadText />
                Posts
              </Link>
            </Button>
          </li>
        )}
        {(user?.publicMetadata?.isAdmin as boolean) && (
          <li>
            <Button
              variant={tab === "users" ? "default" : "ghost"}
              className="w-full"
            >
              <Link
                href="/dashboard?tab=users"
                className="w-full flex items-center gap-2"
              >
                <Users />
                Users
              </Link>
            </Button>
          </li>
        )}
        <li>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <div className="w-full flex items-center gap-2">
              <LogOut />
              <SignOutButton />
            </div>
          </Button>
        </li>
      </ul>
    );
  }
}
