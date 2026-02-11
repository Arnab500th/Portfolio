import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="bg-[#121212] w-full min-h-screen">
      {/* Increased from 1000vh to 2000vh to show all 192 frames smoothly */}
      <div className="relative h-[1900vh]">
        <ScrollyCanvas numFrames={192} />
        <Overlay />
      </div>
      <About />
      <Projects />
      <Experience />
      <Contact />
    </main>
  );
}
