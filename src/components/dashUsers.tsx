"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import Loading from "@/app/loading";
import { Check, X } from "lucide-react";
import { userInterface } from "@/types/userT";
import { Image } from "@imagekit/next";
import Container from "./ui/container";
import { TypographyH3 } from "./ui/typography";

export default function DashUsers() {
  const { user } = useUser();
  const [isLoaded, setIsLoaded] = useState(false);
  const [users, setUsers] = useState<userInterface[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoaded(true);
        const res = await fetch("/api/user/get", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userMongoId: user?.publicMetadata?.userMongoId,
          }),
        });
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          setIsLoaded(false);
        }
        if (!res.ok) {
          setIsLoaded(false);
          console.log("fail to get user", data);
        }
      } catch (error: any | unknown) {
        console.log(error.message);
        setIsLoaded(false);
      }
    };
    if (user?.publicMetadata?.isAdmin) {
      fetchUsers();
    }
  }, [user?.publicMetadata?.isAdmin]);

  if (isLoaded) return <Loading />;

  if (!user?.publicMetadata?.isAdmin && !isLoaded) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full py-7">
        <h1 className="text-2xl font-semibold">You are not an admin!</h1>
      </div>
    );
  }
  return (
    <section>
      <Container>
        {user?.publicMetadata?.isAdmin && users.length > 0 ? (
          <>
            <Table className="shadow-md">
              <TableHeader>
                <TableRow>
                  <TableHead>Date created</TableHead>
                  <TableHead>User image</TableHead>
                  <TableHead>Username</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Admin</TableHead>
                </TableRow>
              </TableHeader>
              {users.map((user) => (
                <TableBody key={user._id}>
                  <TableRow>
                    <TableCell>
                      {new Date(user.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Image
                        src={user.profilePicture}
                        alt={user.username}
                        width={40}
                        height={40}
                        className="w-10 h-10 object-cover bg-gray-500 rounded-full"
                      />
                    </TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      {user.isAdmin ? (
                        <Check className="text-green-500" />
                      ) : (
                        <X className="text-red-500" />
                      )}
                    </TableCell>
                  </TableRow>
                </TableBody>
              ))}
            </Table>
          </>
        ) : (
          <TypographyH3>You have no users yet!</TypographyH3>
        )}
      </Container>
    </section>
  );
}
