"use client";

import { Users, Calendar, Award, Music } from "lucide-react";
import dancerSilhouette1 from "@/assets/dancer-silhouette-1.png";

const stats = [
  { icon: Users, value: "30+", label: "Active Members" },
  { icon: Calendar, value: "5+", label: "Events Yearly" },
  { icon: Calendar, value: "50+", label: "Years of Excellence" },
  { icon: Music, value: "8+", label: "Art Forms" },
];

const About = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background dancer silhouette */}
      <img
        src={dancerSilhouette1.src || dancerSilhouette1}
        alt=""
        className="absolute right-0 top-1/2 -translate-y-1/2 h-[80vh] opacity-5 pointer-events-none"
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div>
            <p className="text-butter-muted text-sm tracking-[0.2em] uppercase mb-4">
              About Us
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-foreground mb-6 leading-tight animate-title-reveal">
              Empowering Events,
              <br />
              <span className="text-butter-muted">Connecting Communities</span>
            </h2>
            <div className="section-divider !mx-0 mb-8" />

            <p className="text-muted-foreground mb-6 leading-relaxed">
              The University Cultural Society (UCS), founded in 1968, is the
              central cultural body of our university, responsible for planning,
              organising, and managing major events throughout the year. We
              bring students together through meaningful cultural activities
              while ensuring that every event runs smoothly, creatively, and
              professionally.
              <br />
              From flagship events like Pant Jayanti, the bi-annual Kisan Mela,
              and the Alumni Meet, to various events, UCS takes the lead in
              coordinating performances, managing logistics, and engaging
              participants from across the university.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              With every event we conduct, our goal is to offer students
              opportunities to participate, perform, volunteer, and grow, both
              personally and artistically. 
              <br />At UCS, we don’t just organise
              events. we build experiences, encourage teamwork, and create
              moments that unite our university.
            </p>
          </div>

          {/* Right stats grid */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="royal-card bg-card p-8 rounded-2xl border border-border/50 card-glow text-center animate-royal-slide-in"
                style={{ animationDelay: `${0.2 + index * 0.15}s` }}
              >
                <stat.icon className="w-8 h-8 text-butter-muted mx-auto mb-4" />
                <p className="font-display text-4xl text-foreground mb-2">
                  {stat.value}
                </p>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
