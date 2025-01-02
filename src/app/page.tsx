import Advice from "@/components/Advice";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import ScrollIndicator from "@/components/ScrollIndicator"

export default function Home() {
  return (
    <div id="root" className="h-full container m-auto flex flex-col text-primary-200">
      <Navbar />
      <ScrollIndicator />
      <main className="h-full">
        <Hero />
        {Array.from({ length: 2 }, ((_, i) => <Advice key={i} />))}
      </main>
    </div>
  );
}