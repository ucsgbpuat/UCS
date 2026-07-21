import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, MapPin, Clock, Users, ArrowRight } from "lucide-react";
import { useLazyLoad } from "@/hooks/useLazyLoad";
import { LazyLoadImage } from "@/components/LazyLoadImage";
import { getBackendUri } from "@/lib/apiConfig";

interface Event {
  _id?: string;
  id?: string;
  title: string;
  category: string;
  date: string;
  time: string;
  venue: string;
  description: string;
  image: string;
  attendees: number;
  eventType: "upcoming" | "past";
}

const Events = () => {
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);

        const backendUri = getBackendUri();

        // Fetch upcoming events only
        const response = await fetch(`${backendUri}/api/events/type/upcoming`);
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await response.json();

        setUpcomingEvents(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred while fetching events");
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);


  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center py-32">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading events...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center py-32">
          <div className="text-center max-w-md">
            <p className="text-red-500 text-lg font-semibold mb-2">Error Loading Events</p>
            <p className="text-muted-foreground">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-primary blur-3xl animate-float" />
          <div className="absolute bottom-0 left-10 w-64 h-64 rounded-full bg-primary blur-3xl animate-subtle-rotate" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4 animate-fade-up" style={{ animationDelay: "0.1s" }}>
              Cultural Calendar
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-title-reveal" style={{ animationDelay: "0.2s" }}>
              Stay tuned for the exciting events coming up at UCS!
            </h1>
            <p className="text-muted-foreground text-lg animate-luxurious-fade" style={{ animationDelay: "0.5s" }}>
              From cultural celebrations to major university gatherings, each
              event is thoughtfully planned to bring students together and
              create meaningful experiences.
            </p>
          </div>
        </div>
      </section>

      {/* All Upcoming Events */}
      <section className="py-16 bg-espresso/5">
        <div className="container mx-auto px-6">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-10 animate-title-reveal" style={{ animationDelay: "0.2s" }}>
            Upcoming Events
          </h2>

          {upcomingEvents.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 px-6">
              <div className="text-center max-w-md">
                <div className="mb-6 flex justify-center animate-royal-slide-in" style={{ animationDelay: "0.1s" }}>
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
                    <div className="relative bg-primary/10 rounded-full p-6 border border-primary/30">
                      <Calendar className="w-12 h-12 text-primary" />
                    </div>
                  </div>
                </div>
                <h3 className="font-display text-3xl font-bold text-foreground mb-3 animate-title-reveal">
                  No Upcoming Events
                </h3>
                <p className="text-lg text-muted-foreground mb-8 animate-luxurious-fade" style={{ animationDelay: "0.3s" }}>
                  Stay tuned for notifications
                </p>
                <p className="text-muted-foreground animate-luxurious-fade" style={{ animationDelay: "0.5s" }}>
                  We're planning something amazing! Check back soon for announcements about our next cultural celebration.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event, index) => (
                <div
                  key={event._id || event.id}
                  className="group royal-card bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-elegant animate-royal-slide-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="aspect-video relative overflow-hidden">
                    <LazyLoadImage
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-espresso/60 to-transparent" />
                    <span className="absolute top-3 left-3 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                      {event.category}
                    </span>
                  </div>

                  <div className="p-5">
                    <h3 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {event.description}
                    </p>

                    <div className="flex flex-wrap gap-3 text-xs text-foreground/70">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} className="text-primary" />
                        {event.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={14} className="text-primary" />
                        {event.venue}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Events;
