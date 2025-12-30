"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import DashProfile from "@/components/dashProfile";
import DashPosts from "@/components/dashPosts";
import DashUsers from "@/components/dashUsers";
import DashboardComp from "@/components/dashboardComp";
import Loading from "../loading";

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
      {tab === "profile" && (
        <Suspense fallback={<Loading />}>
          <DashProfile />
        </Suspense>
      )}

      {tab === "posts" && (
        <Suspense fallback={<Loading />}>
          <DashPosts />
        </Suspense>
      )}

      {tab === "users" && (
        <Suspense fallback={<Loading />}>
          <DashUsers />
        </Suspense>
      )}
      {tab === "dash" && (
        <Suspense fallback={<Loading />}>
          <DashboardComp />
        </Suspense>
      )}
    </div>
  );
}
