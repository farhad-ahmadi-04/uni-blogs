"use client";

import { Suspense, useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { postInterface } from "@/types/postT";
import { userInterface } from "@/types/userT";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { ArrowUp, Text, User2 } from "lucide-react";
import Container from "./ui/container";

export default function DashboardComp() {
  const [users, setUsers] = useState<userInterface[]>([]);
  const [posts, setPosts] = useState<postInterface[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [isPostsLoaded, setIsPostsLoaded] = useState(false);
  const [isUsersLoaded, setIsUsersLoaded] = useState(false);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const { user } = useUser();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsUsersLoaded(true);
        const res = await fetch("/api/user/get", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            limit: 5,
          }),
        });

        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          setTotalUsers(data.totalUsers);
          setLastMonthUsers(data.lastMonthUsers);
          setIsUsersLoaded(false);
        }
        if (!res.ok) {
          console.log("fail to get users", data);
          setIsUsersLoaded(false);
        }
      } catch (error: any | unknown) {
        console.log(error.message);
        setIsUsersLoaded(false);
      }
    };
    const fetchPosts = async () => {
      try {
        setIsPostsLoaded(true);
        const res = await fetch("/api/post/get", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            limit: 5,
          }),
        });
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
          setTotalPosts(data.totalPosts);
          setLastMonthPosts(data.lastMonthPosts);
          setIsPostsLoaded(false);
        }
        if (!res.ok) {
          console.log("fail to get posts", data);
          setIsPostsLoaded(false);
        }
      } catch (error: any | unknown) {
        console.log(error.message);
        setIsPostsLoaded(false);
      }
    };

    if (user?.publicMetadata?.isAdmin) {
      fetchUsers();
      fetchPosts();
    }
  }, [user]);

  return (
    <section>
      <Container>
        <div className="flex-wrap flex md:flex-nowrap gap-4 justify-center">
          <div className="bg-card flex flex-col p-3 gap-4 w-full shadow-md rounded-md ">
            <div className="flex justify-between">
              <div className="">
                <h3 className="text-gray-500 text-md uppercase">Total Users</h3>
                <p className="text-2xl">{totalUsers}</p>
              </div>
              <User2 />
            </div>
            <div className="flex  gap-2 text-sm">
              <span className="text-green-500 flex items-center">
                <ArrowUp />
                {lastMonthUsers}
              </span>
              <div className="text-gray-500">Last month</div>
            </div>
          </div>

          <div className="bg-card flex flex-col p-3 gap-4 w-full rounded-md shadow-md">
            <div className="flex justify-between">
              <div className="">
                <h3 className="text-gray-500 text-md uppercase">Total Posts</h3>
                <p className="text-2xl">{totalPosts}</p>
              </div>
              <Text />
            </div>
            <div className="flex  gap-2 text-sm">
              <span className="text-green-500 flex items-center">
                <ArrowUp />
                {lastMonthPosts}
              </span>
              <div className="text-gray-500">Last month</div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap md:flex-nowrap gap-4 py-3">
          <div className="bg-card min-h-50 flex flex-col w-full md:w-1/3 shadow-md p-2 rounded-md">
            <div className="flex justify-between  mb-2 text-sm font-semibold">
              <h1 className="text-center p-2">Recent users</h1>
              <Button variant={"outline"}>
                <Link href={"/dashboard?tab=users"}>See all</Link>
              </Button>
            </div>
            {isUsersLoaded ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User image</TableHead>
                    <TableHead>Username</TableHead>
                  </TableRow>
                </TableHeader>
                {users &&
                  users.map((user) => (
                    <TableBody key={user._id} className="divide-y">
                      <TableRow>
                        <TableCell>
                          <img
                            src={user.profilePicture}
                            alt="user"
                            className="w-10 h-10 rounded-full bg-gray-500"
                          />
                        </TableCell>
                        <TableCell>{user.username}</TableCell>
                      </TableRow>
                    </TableBody>
                  ))}
              </Table>
            )}
          </div>

          <div className="bg-card min-h-50 flex flex-col w-full md:w-2/3 shadow-md p-2 rounded-md">
            <div className="flex justify-between mb-2 text-sm font-semibold">
              <h1 className="text-center p-2">Recent posts</h1>
              <Button variant={"outline"}>
                <Link href={"/dashboard?tab=posts"}>See all</Link>
              </Button>
            </div>
            {isPostsLoaded ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Post image</TableHead>
                    <TableHead>Post Title</TableHead>
                    <TableHead>Category</TableHead>
                  </TableRow>
                </TableHeader>
                {posts &&
                  posts.map((post) => (
                    <TableBody key={post._id} className="divide-y">
                      <TableRow>
                        <TableCell>
                          <img
                            src={post.image}
                            alt="user"
                            className="w-14 h-10 rounded-md bg-gray-500"
                          />
                        </TableCell>
                        <TableCell className="w-96">{post.title}</TableCell>
                        <TableCell className="w-5">{post.category}</TableCell>
                      </TableRow>
                    </TableBody>
                  ))}
              </Table>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
