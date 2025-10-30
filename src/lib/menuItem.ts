import { BookOpenText, Contact, Home, Newspaper } from "lucide-react";

// menu item
const menuItems = [
  {
    title: "Home",
    href: "/",
    icon: Home,
  },
  {
    title: "About",
    href: "/about",
    icon: BookOpenText ,
  },
  {
    title: "Blog",
    href: "/blogs",
    icon: Newspaper 
  },
  {
    title: "Contact",
    href: "/contact",
    icon: Contact
  },
];
export default menuItems;