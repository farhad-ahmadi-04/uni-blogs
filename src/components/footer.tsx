import Container from "./ui/container";

function Footer() {
  return (
    <footer>
      <Container className="h-20 flex items-center justify-center border-t mt-10">
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Uni-Blogs. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}

export default Footer;
