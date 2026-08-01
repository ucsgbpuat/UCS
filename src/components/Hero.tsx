"use client";

import dancerSilhouette1 from "@/assets/dancer-silhouette-1.png";
import dancerSilhouette2 from "@/assets/dancer-silhouette-2.png";
import singerSilhouette1 from "@/assets/singer-silhouette-1.png";
import singerSilhouette2 from "@/assets/singer-silhouette-2.png";
import Link from "next/link";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-butter-muted/30 via-background to-background" />
      
      {/* Decorative glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-30"
        style={{ background: "radial-gradient(circle, hsl(14 27% 19% / 0.08), transparent 70%)" }}
      />

      {/* Left side - Dancer and Singer Silhouettes */}
      <img
        src={dancerSilhouette1.src || dancerSilhouette1}
        alt="Classical dancer silhouette"
        className="absolute left-0 bottom-0 h-[70vh] opacity-15 object-contain pointer-events-none select-none animate-silhouette-glide"
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-espresso-light text-sm md:text-base tracking-[0.3em] uppercase mb-6 animate-fade-up opacity-0" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
            University Cultural Society
          </p>
          
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-foreground mb-6 leading-tight animate-title-reveal" style={{ animationDelay: "0.3s" }}>
            Where Culture<br />
            <span className="text-gradient">Finds Its Voice</span>
          </h1>
          
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 animate-luxurious-fade opacity-0" style={{ animationDelay: "0.8s", animationFillMode: "forwards" }}>
            The University Cultural Society (UCS) is the creative heartbeat of our campus. It's brings together traditions, talent, and teamwork. Through dance, music, and major university events, we offer students a platform to express and grow while creating vibrant, inclusive experiences for all.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-royal-slide-in" style={{ animationDelay: "1s" }}>
            <Link
              href="/events"
              className="royal-button px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-all animate-fade-in"
            >
              Explore Events
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
