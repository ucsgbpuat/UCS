"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./crescendo.css";

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

const Crescendo = () => {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const targetDate = new Date("2026-05-10").getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeRemaining({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isExpired: true,
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeRemaining({
        days,
        hours,
        minutes,
        seconds,
        isExpired: false,
      });
    };

    // Calculate immediately
    calculateTimeRemaining();

    // Set up interval to update every second
    const interval = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="min-h-screen bg-gradient-to-br from-purple-900/20 via-background to-blue-900/20 flex items-center justify-center py-12 sm:py-16 md:py-24 relative overflow-hidden">
        {/* Animated background circles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          
          
        </div>
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center">
            {/* Coming Soon Text */}
            <div className="mb-8 sm:mb-10 md:mb-12">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-butter-muted tracking-wider mb-3 sm:mb-4">
                Coming Soon
              </h1>
              <div className="section-divider mb-6 sm:mb-8" />
              <p className="font-display text-4xl sm:text-6xl md:text-8xl font-black text-foreground mb-3 sm:mb-4 animate-pulse tracking-tighter crescendo-title">
                Crescendo 2026
              </p>
            </div>

            {/* Countdown Timer */}
            {!timeRemaining.isExpired ? (
              <div className="flex flex-wrap justify-center gap-2 sm:gap-4 md:gap-8 mb-8 sm:mb-10 md:mb-12">
                {/* Days */}
                <div className="flex flex-col items-center animate-royal-slide-in" style={{ animationDelay: "0.2s" }}>
                  <div className="bg-primary/10 border-2 border-primary/30 rounded-lg p-3 sm:p-5 md:p-8 min-w-[60px] sm:min-w-[80px] md:min-w-[120px] backdrop-blur-sm hover:bg-primary/20 transition-all hover:shadow-lg hover:shadow-primary/50 hover:border-primary/50 glow-box animate-royal-countdown">
                    <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-primary animate-number-glow">
                      {timeRemaining.days.toString().padStart(2, "0")}
                    </span>
                  </div>
                  <span className="text-xs sm:text-sm md:text-base text-foreground/70 mt-2 sm:mt-3 md:mt-4 font-bold uppercase tracking-widest">
                    Days
                  </span>
                </div>

                {/* Hours */}
                <div className="flex flex-col items-center animate-royal-slide-in" style={{ animationDelay: "0.3s" }}>
                  <div className="bg-primary/10 border-2 border-primary/30 rounded-lg p-3 sm:p-5 md:p-8 min-w-[60px] sm:min-w-[80px] md:min-w-[120px] backdrop-blur-sm hover:bg-primary/20 transition-all hover:shadow-lg hover:shadow-primary/50 hover:border-primary/50 glow-box animate-royal-countdown">
                    <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-primary animate-number-glow">
                      {timeRemaining.hours.toString().padStart(2, "0")}
                    </span>
                  </div>
                  <span className="text-xs sm:text-sm md:text-base text-foreground/70 mt-2 sm:mt-3 md:mt-4 font-bold uppercase tracking-widest">
                    Hours
                  </span>
                </div>

                {/* Minutes */}
                <div className="flex flex-col items-center animate-royal-slide-in" style={{ animationDelay: "0.4s" }}>
                  <div className="bg-primary/10 border-2 border-primary/30 rounded-lg p-3 sm:p-5 md:p-8 min-w-[60px] sm:min-w-[80px] md:min-w-[120px] backdrop-blur-sm hover:bg-primary/20 transition-all hover:shadow-lg hover:shadow-primary/50 hover:border-primary/50 glow-box animate-royal-countdown">
                    <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-primary animate-number-glow">
                      {timeRemaining.minutes.toString().padStart(2, "0")}
                    </span>
                  </div>
                  <span className="text-xs sm:text-sm md:text-base text-foreground/70 mt-2 sm:mt-3 md:mt-4 font-bold uppercase tracking-widest">
                    Minutes
                  </span>
                </div>

                {/* Seconds */}
                <div className="flex flex-col items-center animate-royal-slide-in" style={{ animationDelay: "0.5s" }}>
                  <div className="bg-primary/10 border-2 border-primary/30 rounded-lg p-3 sm:p-5 md:p-8 min-w-[60px] sm:min-w-[80px] md:min-w-[120px] backdrop-blur-sm hover:bg-primary/20 transition-all hover:shadow-lg hover:shadow-primary/50 hover:border-primary/50 glow-box animate-royal-countdown">
                    <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-primary animate-number-glow">
                      {timeRemaining.seconds.toString().padStart(2, "0")}
                    </span>
                  </div>
                  <span className="text-xs sm:text-sm md:text-base text-foreground/70 mt-2 sm:mt-3 md:mt-4 font-bold uppercase tracking-widest">
                    Seconds
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-2xl sm:text-3xl md:text-5xl text-primary font-black animate-pulse">
                  It's Here! Crescendo 2026 has begun!
                </p>
              </div>
            )}

            {/* Description */}
            <div className="mt-10 sm:mt-12 md:mt-16 max-w-2xl mx-auto px-2">
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed font-medium">
                Get ready for the most exciting cultural celebration of the year.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Crescendo;
