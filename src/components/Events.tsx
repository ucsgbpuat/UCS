import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { LazyLoadImage } from "./LazyLoadImage";

const pastEvents = [
  {
    title: "Pant Jayanti 2025",
    description: "Honouring the legacy of Pandit Govind Ballabh Pant.",
    image: "https://pub-b9cd201fbde6424783fdf034160caaab.r2.dev/ucs/events/Pant%20Jayanti%202025/PantJayanti.webp",
  },
  {
    title: "118th Kishan Mela",
    description: "Celebrating the hands that nourish the nation",
    image: "https://pub-b9cd201fbde6424783fdf034160caaab.r2.dev/ucs/events/118th%20Kishan%20Mela/KishanMela.webp",
  },
  {
    title: "The Band Show 2025",
    description: "Where music lights up the night and talent takes the stage.",
    image: "https://pub-b9cd201fbde6424783fdf034160caaab.r2.dev/ucs/events/Band%20Show%202025/BandShow.webp",
  },
  {
    title: "Alumni Meet 2025",
    description: "Reconnecting memories and strengthening bonds.",
    image: "https://pub-b9cd201fbde6424783fdf034160caaab.r2.dev/ucs/events/Alumni%20Meet%202025/alumni.webp",
  },
  {
    title: "Inter University Sports Cultural Festival 2025",
    description: "A vibrant celebration of diversity and creativity.",
    image: "https://pub-b9cd201fbde6424783fdf034160caaab.r2.dev/ucs/events/StateLevelSportsMeet/statelevel.webp",
  },
  {
    title: "119th Kishan Mela",
    description: "Celebrating the hands that nourish the nation",
    image: "https://pub-b9cd201fbde6424783fdf034160caaab.r2.dev/ucs/events/119th%20Kishan%20Mela/119th%20Kishan%20Mela.webp",
  },
];

const Events = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % pastEvents.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + pastEvents.length) % pastEvents.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % pastEvents.length);
  };

  return (
    <section id="events" className="py-24 relative" style={{"backgroundColor":"#1F2A44"}}>
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full  from-espresso-light/20 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-butter-muted text-sm tracking-[0.2em] uppercase mb-4 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Our Journey
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4 animate-title-reveal" style={{"color":"#fdf8d0"}}>
            Past Events
          </h2>
          <div className="section-divider" style={{"backgroundColor":"#fdf8d0"}}/>
          <p className="text-muted-foreground mt-6 max-w-2xl mx-auto animate-luxurious-fade" style={{"color":"#fff", animationDelay: "0.6s"}}>
            Relive the magical moments from our previous cultural celebrations and performances.
          </p>
        </div>

        {/* Slideshow */}
        <div className="relative max-w-5xl mx-auto">
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-elegant royal-card animate-royal-slide-in" style={{ animationDelay: "0.8s" }}>
            {pastEvents.map((event, index) => (
              <div
                key={event.title}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  index === currentIndex ? "opacity-100" : "opacity-0"
                }`}
              >
                <LazyLoadImage
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/90 via-espresso/30 to-transparent" />
                
                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                  <h3 className="font-display text-2xl md:text-4xl text-butter mb-2">
                    {event.title}
                  </h3>
                  <p className="text-butter/80 text-lg">
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-butter/20 backdrop-blur-sm text-butter hover:bg-butter/30 transition-colors flex items-center justify-center" 
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-butter/20 backdrop-blur-sm text-butter hover:bg-butter/30 transition-colors flex items-center justify-center"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots indicator */}
          <div className="flex justify-center gap-3 mt-6" >
            {pastEvents.map((_, index) => (
              <button style={{"backgroundColor":"#fdf8d0"}}
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-primary w-8"
                    : "bg-primary/30 hover:bg-primary/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;
