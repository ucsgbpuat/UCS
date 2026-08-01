"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 bg-gradient-to-b from-primary/10 to-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-20 w-64 h-64 rounded-full bg-primary blur-3xl animate-float" />
          <div className="absolute bottom-0 right-20 w-80 h-80 rounded-full bg-primary blur-3xl animate-subtle-rotate" />
        </div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 animate-title-reveal" style={{ animationDelay: "0.2s" }}>
            Get In Touch
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-luxurious-fade" style={{ animationDelay: "0.5s" }}>
            Have questions about our events or want to collaborate? We'd love to
            hear from you!
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Contact Details */}
          <div className="royal-card bg-card rounded-2xl p-8 shadow-lg border border-border animate-royal-slide-in" style={{ animationDelay: "0.3s" }}>
            <h2 className="text-2xl font-bold text-foreground mb-6 animate-title-reveal" style={{ animationDelay: "0.4s" }}>
              Contact Information
            </h2>
            <div className="space-y-5">
              <div className="flex items-start gap-4 animate-fade-up" style={{ animationDelay: "0.5s" }}>
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 animate-elegant-glow">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Address</h3>
                  <p className="text-muted-foreground text-sm">
                    Department Of Student Welfare
                    <br />
                    GBPUAT, Pantnagar - 263145
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 animate-fade-up" style={{ animationDelay: "0.6s" }}>
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 animate-elegant-glow">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Phone</h3>
                  <p className="text-muted-foreground text-sm">
                    +91 9389954163
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 animate-fade-up" style={{ animationDelay: "0.7s" }}>
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 animate-elegant-glow">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Email</h3>
                  <p className="text-muted-foreground text-sm">
                    ucs.gbpuat123@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Google Map */}
          <div className="royal-card bg-card rounded-2xl overflow-hidden shadow-lg border border-border h-fit animate-royal-slide-in" style={{ animationDelay: "0.4s" }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15753.572030044581!2d79.46881234845321!3d29.019833721092407!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a08744064bc04b%3A0x503c5816efa9718a!2sDepartment%20Of%20Student%20Welfare!5e0!3m2!1sen!2sin!4v1765367589051!5m2!1sen!2sin"
              width="100%"
              height="320"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Location Map"
              className="grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
