"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Events from "@/components/Events";
import About from "@/components/About";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Events />
      <About />
      <Footer />
    </div>
  );
}
