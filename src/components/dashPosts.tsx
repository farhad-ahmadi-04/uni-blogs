"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import Container from "./ui/container";
import { TypographyH1, TypographyH3 } from "./ui/typography";
import { postInterface } from "@/types/postT";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Image } from "@imagekit/next";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { CircleAlert } from "lucide-react";
import Loading from "@/app/loading";

export default function DashPosts() {
  const { user } = useUser();
  const [userPosts, setUserPosts] = useState<postInterface[]>([]);
  const [postIdToDelete, setPostIdToDelete] = useState("");
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoader(true);
        const res = await fetch("/api/post/get", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user?.publicMetadata?.userMongoId,
          }),
        });
        const data = await res.json();
        if (res.ok) {
          setUserPosts(data.posts);
        }
        setLoader(false);
      } catch (error: any | unknown) {
        console.log(error.message);
        setLoader(false);
      }
    };
    if (user?.publicMetadata?.isAdmin) {
      fetchPosts();
    }
  }, [user?.publicMetadata?.isAdmin, user?.publicMetadata?.userMongoId]);

  const handleDeletePost = async () => {
    try {
      const res = await fetch("/api/post/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId: postIdToDelete,
          userId: user?.publicMetadata?.userMongoId,
        }),
        cache: "reload",
      });
      const data = await res.json();
      if (res.ok) {
        const newPosts = userPosts.filter(
          (post) => post._id !== postIdToDelete
        );
        setUserPosts(newPosts);
        setPostIdToDelete(""); // Reset postIdToDelete after deletion
      } else {
        console.log(data.message);
      }
    } catch (error: any | unknown) {
      console.log(error.message);
    }
  };

  if (loader) {
    return <Loading />;
  }
  if (!user?.publicMetadata?.isAdmin) {
    return (
      <section className="w-full">
        <Container>
          <TypographyH1 className="text-center text-4xl font-semibold mt-5">
            You are not an admin!
          </TypographyH1>
        </Container>
      </section>
    );
  }

  return (
    <section>
      <Container>
        <Dialog>
          {user?.publicMetadata?.isAdmin && userPosts.length > 0 ? (
            <Table>
              <TableCaption>A list of your recent posts.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Date updated</TableHead>
                  <TableHead>Post image</TableHead>
                  <TableHead>Post title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Delete</TableHead>
                  <TableHead className="text-right">Edit</TableHead>
                </TableRow>
              </TableHeader>
              {userPosts && (
                <TableBody>
                  {userPosts.map((post: postInterface) => (
                    <TableRow key={post._id}>
                      <TableCell className="font-medium">
                        {new Date(post.updatedAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Link href={`/post/${post.slug}`}>
                          <Image
                            src={post.image}
                            alt={post.title}
                            width={80}
                            height={40}
                            className="w-20 h-10 object-cover bg-gray-500"
                          />
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link
                          className="font-medium text-gray-900 dark:text-white"
                          href={`/post/${post.slug}`}
                        >
                          {post.title}
                        </Link>
                      </TableCell>
                      <TableCell>{post.category}</TableCell>
                      <TableCell className="text-right">
                        <DialogTrigger asChild>
                          <span
                            className="font-medium text-red-500 hover:underline cursor-pointer"
                            onClick={() => setPostIdToDelete(post._id)}
                          >
                            Delete
                          </span>
                        </DialogTrigger>
                      </TableCell>
                      <TableCell className="text-right">
                        <Link
                          className="text-teal-500 hover:underline"
                          href={`/dashboard/update-post/${post._id}`}
                        >
                          <span>Edit</span>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              )}
            </Table>
          ) : (
            <TypographyH3 className="text-center">
              You have no posts yet!
            </TypographyH3>
          )}

          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex justify-center">
                <CircleAlert className="text-red-500" />
              </DialogTitle>
            </DialogHeader>
            <div className="flex justify-center gap-4">
              Are you sure you want to delete this post?
            </div>
            <DialogFooter className="sm:justify-center">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  No, cancel
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button
                  type="button"
                  variant={"destructive"}
                  onClick={handleDeletePost}
                >
                  Yes, I&apos;m sure
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>

          {/* <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
        >
        <Modal.Header />
        <Modal.Body>
        <div className="text-center">
        <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
        <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
        Are you sure you want to delete this post?
        </h3>
        <div className="flex justify-center gap-4">
        <Button color="failure" onClick={handleDeletePost}>
        Yes, I&apos;m sure
        </Button>
        <Button color="gray" onClick={() => setShowModal(false)}>
        No, cancel
        </Button>
        </div>
        </div>
        </Modal.Body>
              </Modal> */}
        </Dialog>
      </Container>
    </section>
  );
}
