import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div id="root" className="h-full container m-auto flex flex-col text-primary-200">
      <Navbar />
      <main className="h-full">
        <Hero />
      </main>
    </div>
  );
}
