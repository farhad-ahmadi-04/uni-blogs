"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import DashProfile from "@/components/dashProfile";
import DashPosts from "@/components/dashPosts";
import DashUsers from "@/components/dashUsers";
import DashboardComp from "@/components/dashboardComp";

export default function Dashboard() {
  const searchParams = useSearchParams();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(searchParams);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen w-full my-5">
      {/* profile... */}
      {tab === "profile" && <DashProfile />}

      {tab === "posts" && <DashPosts />}

      {tab === "users" && <DashUsers />}
      {tab === "dash" && <DashboardComp />}
    </div>
  );
}
