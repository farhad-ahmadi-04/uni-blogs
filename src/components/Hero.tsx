import Link from "next/link";

function Hero() {
    return (
        <div className="hero  h-full">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold text-primary">Hello there</h1>
                    <p className="py-6">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                        Necessitatibus nobis velit, voluptatibus facere dolor error quibusdam explicabo quam quaerat fuga earum blanditiis officia porro aliquid. Sapiente, nam ea. Ullam, eius.
                    </p>
                    <Link passHref href={"https://github.com/farhad-ahmadi-04?tab=overview&from=2025-01-01&to=2025-01-01"}>
                        <button className="btn btn-info">Check Github</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Hero;