import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Services from "@/sections/Services";
import Technologies from "@/sections/Technologies";
import WhyMe from "@/sections/WhyMe";
import Contact from "@/sections/Contact";
import Footer from "@/sections/Footer";

function SectionDivider() {
  return (
    <div className="max-w-6xl mx-auto px-6 lg:px-8 pointer-events-none" aria-hidden="true">
      <div className="h-px bg-gradient-to-r from-transparent via-zinc-300/60 dark:via-zinc-800/50 to-transparent" />
    </div>
  );
}

export default function Home() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <SectionDivider />
        <About />
        <SectionDivider />
        <Services />
        <SectionDivider />
        <Technologies />
        <SectionDivider />
        <WhyMe />
        <SectionDivider />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
