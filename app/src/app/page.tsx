import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import ProblemSolved from "@/components/ProblemSolved";
import Revolutionary from "@/components/Revolutionary";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <Hero />
        <ProblemSolved />
        <HowItWorks />
        <Revolutionary />
        <Features />
      </main>
    </div>
  );
}
