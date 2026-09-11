"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Events from "@/components/Events";
import About from "@/components/About";
import Footer from "@/components/Footer";
import teamFallback from "@/assets/event-workshop.jpg";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="w-full pt-20" aria-label="University Cultural Society team">
        <div className="relative min-h-48 overflow-hidden bg-background sm:min-h-64 md:min-h-[28rem]">
          <img
            src="https://pub-b9cd201fbde6424783fdf034160caaab.r2.dev/ucs/team.jpg"
            alt="University Cultural Society team"
            className="absolute inset-0 block h-full w-full object-cover object-center saturate-[0.9] contrast-[1.05] animate-team-image"
            onError={(event) => {
              event.currentTarget.src = teamFallback.src;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-accent/30 via-transparent to-primary/35 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-espresso-dark/25 via-transparent to-espresso-dark/60" />
          <div className="relative flex min-h-48 items-end justify-start px-6 py-8 text-left text-primary-foreground sm:min-h-64 sm:px-10 sm:py-10 md:min-h-[28rem] md:px-16 md:py-14">
            <div className="animate-fade-up">
              <h1 className="font-display text-4xl leading-tight drop-shadow-[0_4px_14px_rgba(0,0,0,0.85)] sm:text-5xl md:text-7xl">
                Our Team
              </h1>
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent via-background/30 to-background md:h-44" />
        </div>
      </section>
      <Hero />
      <Events />
      <About />
      <Footer />
    </div>
  );
}
