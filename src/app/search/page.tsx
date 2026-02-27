"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import BlogCard from "@/components/blogCard";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { postInterface } from "@/types/postT";
import { Label } from "@/components/ui/label";
import { category } from "../../lib/createPostFormSchema";
import Container from "@/components/ui/container";
export default function Search() {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    sort: "desc",
    category: "",
  });

  const [posts, setPosts] = useState<postInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(searchParams);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const sortFromUrl = urlParams.get("sort");
    const categoryFromUrl = urlParams.get("category");
    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSidebarData((prev) => ({
        ...prev,
        searchTerm: searchTermFromUrl || "",
        sort: sortFromUrl || "desc",
        category: categoryFromUrl || "",
      }));
    }

    const fetchPosts = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch("/api/post/get", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          limit: 9,
          order: sortFromUrl,
          category: categoryFromUrl,
          searchTerm: searchTermFromUrl,
        }),
      });
      if (!res.ok) {
        setLoading(false);
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts);
        setLoading(false);
        if (data.posts.length === 9) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      }
    };
    fetchPosts();
  }, [searchParams]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSidebarData((prev) => ({ ...prev, searchTerm: e.target.value }));
  };

  const handleSortChange = (value: string) => {
    setSidebarData((prev) => ({ ...prev, sort: value }));
  };

  const handleCategoryChange = (value: string) => {
    setSidebarData((prev) => ({ ...prev, category: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("not refresh...");
    if (!sidebarData.searchTerm) {
      sidebarData.searchTerm = "";
    }
    const urlParams = new URLSearchParams(searchParams);
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("sort", sidebarData.sort);
    urlParams.set("category", sidebarData.category);
    const searchQuery = urlParams.toString();
    router.push(`/search?${searchQuery}`);
  };

  const handleShowMore = async () => {
    const numberOfPosts = posts.length;
    const startIndex = numberOfPosts;
    const urlParams = new URLSearchParams(searchParams);
    urlParams.set("startIndex", startIndex.toString());
    const searchQuery = urlParams.toString();
    const res = await fetch("/api/post/get", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        limit: 9,
        order: sidebarData.sort,
        category: sidebarData.category,
        searchTerm: sidebarData.searchTerm,
        startIndex,
      }),
    });
    if (!res.ok) {
      return;
    }
    if (res.ok) {
      const data = await res.json();
      setPosts([...posts, ...data.posts]);
      if (data.posts.length === 9) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
    }
  };

  return (
    <section>
      <Container>
        <div className="flex flex-col md:flex-row">
          <div className="py-7 pr-7  md:border-r md:min-h-screen border-border">
            <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
              <div className="flex   items-center gap-2">
                <Label
                  id="searchTerm"
                  className="whitespace-nowrap font-semibold"
                >
                  Search Term:
                </Label>
                <Input
                  placeholder="Search..."
                  id="searchTerm"
                  type="text"
                  value={sidebarData.searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
              <div className="flex items-center gap-2">
                <Label id="sort" className="font-semibold">
                  Sort:
                </Label>
                <Select
                  onValueChange={handleSortChange}
                  value={sidebarData.sort}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Sort</SelectLabel>
                      <SelectItem value="desc">Latest</SelectItem>
                      <SelectItem value="asc">Oldest</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <Label className="font-semibold">Category:</Label>
                <Select
                  onValueChange={handleCategoryChange}
                  value={sidebarData.category}
                >
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>category</SelectLabel>
                      {category.map((item, index) => (
                        <SelectItem key={index} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit">Apply Filters</Button>
            </form>
          </div>
          <div className="w-full">
            <h1 className="text-3xl font-semibold md:border-b border-border p-3 mt-5 ">
              Posts results:
            </h1>
            <div className="p-7 grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
              {!loading && posts.length === 0 && (
                <p className="text-xl text-gray-500">No posts found.</p>
              )}
              {loading && <p className="text-xl text-gray-500">Loading...</p>}
              {!loading &&
                posts &&
                posts.map((post) => <BlogCard key={post._id} post={post} />)}
              {showMore && (
                <button
                  onClick={handleShowMore}
                  className="text-teal-500 text-lg hover:underline p-7 w-full"
                >
                  Show More
                </button>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
