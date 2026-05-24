import Hero from "@/components/Hero";
import ExperienceSlideshow from "@/components/ExperienceSlideshow";
import Skills from "@/components/Skills";
import Portfolio from "@/components/Portfolio";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero />
      <ExperienceSlideshow />
      <Skills />
      <Portfolio />
    </main>
  );
}
