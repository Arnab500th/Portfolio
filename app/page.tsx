import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-[#121212] w-full min-h-screen">
      {/* Wrapper height controls total scroll length — reduced to shorten post-animation scroll */}
      <div className="relative h-[900vh]">
        <ScrollyCanvas numFrames={192} />
        <Overlay />
      </div>
      <About />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </main>
  );
}
