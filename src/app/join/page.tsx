"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Users, Heart, Star, ArrowLeft, Clock } from "lucide-react";

const JoinUs = () => {

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 bg-gradient-to-b from-primary/10 to-background">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6 animate-pulse">
            <Users className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 animate-fade-in">
            Join Our Community
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Become part of the University Cultural Society and explore your passion for arts, music, and cultural expression. Let's celebrate diversity together!
          </p>
        </div>
      </section>


      {/* Coming Soon Section */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-card rounded-2xl p-8 shadow-lg border border-border/50 backdrop-blur-sm">
            {/* Coming Soon Icon */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
                <div className="relative bg-primary/10 rounded-full p-6 border border-primary/30">
                  <Clock className="w-10 h-10 text-primary animate-spin" style={{ animationDuration: "3s" }} />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="text-center space-y-6 animate-fade-in">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-3">
                  Coming Soon!
                </h2>
                <p className="text-lg text-muted-foreground">
                  Our Forms will be live very soon. Get ready to join the UCS family!
                </p>
              </div>

              {/* Loading Dots Animation */}
              <div className="flex justify-center gap-2 py-6">
                <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0s" }}></div>
                <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0.4s" }}></div>
              </div>

              {/* Info Text */}
              <div className="bg-secondary/30 rounded-lg p-4 border border-border/50">
                <p className="text-sm text-foreground/80">
                  📢 We're preparing an amazing experience for our members. Stay tuned for exciting updates!
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                <Link href="/">
                  <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2">
                    <ArrowLeft size={18} />
                    Back to Home
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="mt-8 bg-muted/30 rounded-xl p-6 border border-border text-center animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <p className="text-sm text-muted-foreground mb-2">
              Want to be notified when the form is available?
            </p>
            <p className="text-xs text-muted-foreground">
              Check back soon or follow us on our social media for updates!
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default JoinUs;
