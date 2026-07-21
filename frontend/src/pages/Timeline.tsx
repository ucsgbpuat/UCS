import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LazyLoadImage } from "@/components/LazyLoadImage";
import { getBackendUri } from "@/lib/apiConfig";

interface TimelineEvent {
  _id?: string;
  year: string;
  title: string;
  description: string;
  image: string;
  side: "left" | "right";
}

const Timeline = () => {
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPastEvents = async () => {
      try {
        setLoading(true);
        setError(null);

        const backendUri = getBackendUri();

        // Fetch past events from backend
        const response = await fetch(`${backendUri}/api/events/type/past`);
        if (!response.ok) {
          throw new Error("Failed to fetch past events");
        }
        const data = await response.json();

        // Transform backend data to timeline format
        const transformedEvents = data.map((event: any, index: number) => ({
          _id: event._id,
          year: event.date,
          title: event.title,
          description: event.description,
          image: event.image,
          side: index % 2 === 0 ? "left" : "right" as "left" | "right",
        }));

        setTimelineEvents(transformedEvents);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred while fetching timeline events");
        console.error("Error fetching timeline events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPastEvents();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 bg-gradient-to-b from-primary/10 to-background">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-display text-5xl md:text-6xl font-bold text-foreground mb-4 animate-title-reveal">
            A Legacy of Culture
          </h1>
          <div className="section-divider mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-luxurious-fade" style={{ animationDelay: "0.4s" }}>
            Journey through the decades of artistic excellence, unforgettable performances, and the vibrant history of the University Cultural Society.
          </p>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            {/* Central Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary via-primary to-transparent hidden lg:block" />

            <div className="space-y-12 lg:space-y-20">
              {timelineEvents.map((event, index) => (
                <div
                  key={event.year}
                  className="animate-royal-slide-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`grid lg:grid-cols-2 gap-8 items-center ${event.side === "right" ? "lg:direction-rtl" : ""}`}>
                    {/* Content */}
                    <div className={event.side === "right" ? "lg:order-2" : "lg:order-1"}>
                      <div className="royal-card bg-card p-8 rounded-2xl border border-border/50 card-glow">
                        <div className="inline-block mb-4">
                          <span className="px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-primary font-bold text-lg">
                            {event.year}
                          </span>
                        </div>
                        <h3 className="font-display text-3xl text-foreground mb-3">
                          {event.title}
                        </h3>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                          {event.description}
                        </p>
                      </div>
                    </div>

                    {/* Image */}
                    <div className={event.side === "right" ? "lg:order-1" : "lg:order-2"}>
                      <div className="relative rounded-2xl overflow-hidden border border-border/50 shadow-lg">
                        <LazyLoadImage
                          src={event.image}
                          alt={event.title}
                          className="w-full h-[300px] lg:h-[400px] object-cover transition-transform duration-700 hover:scale-105"
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-espresso/40 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </div>

                    {/* Timeline Dot - Hidden on mobile */}
                    <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-primary border-4 border-background rounded-full items-center justify-center" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      

      <Footer />
    </div>
  );
};

export default Timeline;
