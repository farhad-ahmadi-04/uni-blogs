import Container from "@/components/ui/container";
import { TypographyH1 } from "@/components/ui/typography";

function NotFound() {
    return ( <section>
        <Container className="min-h-screen flex justify-center items-center">
            <TypographyH1>404 - Page Not Found</TypographyH1>
        </Container>
    </section> );
}

export default NotFound;