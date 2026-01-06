import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Container from "@/components/ui/container";
import {
  TypographyH1,
  TypographyH3,
  TypographyP,
} from "@/components/ui/typography";
import { DEFAULT_IMAGE, DEFAULT_IMAGE_ALT } from "@/lib/constants";
import userInfo from "@/lib/userInfo";
import { Mail, Send } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function ContactUs() {
  return (
    <section>
      <Container>
        <TypographyH1 className="text-3xl font-bold text-center">
          Contact Us
        </TypographyH1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 overflow-hidden">
         {userInfo.map((user) => 
        <Card key={user.name} className="pt-0 rounded-xl">
            <CardHeader className="flex items-center justify-center h-52 bg-blue-950 p-0 rounded-xl">
              <Image
                src={"/default user image.jpg"}
                alt={"Default User Image"}
                width={300}
                height={200}
                className="w-full h-full bg-cover rounded-t-xl"
              />
            </CardHeader>
            <CardContent className="w-full">
              <TypographyH3>{user.name}</TypographyH3>

              <TypographyP className="first-letter:uppercase">
                {user.role}
              </TypographyP>
            </CardContent>
            <CardFooter className="flex gap-2 w-full">
              <Link href={`mailto:${user.email}`}>
                <Button variant="outline" className="w-full">
                  <Mail/>
                </Button>
              </Link>
              <Link href={`https://t.me/${user.telegram}`}>
                <Button variant="outline" className="w-full">
                  <Send/>
                </Button>
              </Link>
            </CardFooter>
          </Card>)}
          
        </div>
      </Container>
    </section>
  );
}

export default ContactUs;
