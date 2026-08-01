import { Calendar, MapPin } from "lucide-react";

interface EventCardProps {
  title: string;
  date: string;
  location: string;
  image: string;
  category: string;
}

const EventCard = ({ title, date, location, image, category }: EventCardProps) => {
  return (
    <div className="group relative bg-card rounded-2xl overflow-hidden card-glow">
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
        
        {/* Category badge */}
        <span className="absolute top-4 left-4 px-3 py-1 bg-accent/90 text-accent-foreground text-xs font-medium rounded-full">
          {category}
        </span>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-display text-xl text-card-foreground mb-3 group-hover:text-butter-muted transition-colors">
          {title}
        </h3>
        
        <div className="flex flex-col gap-2 text-muted-foreground text-sm">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-butter-muted" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-butter-muted" />
            <span>{location}</span>
          </div>
        </div>

        <button className="mt-5 w-full py-3 border border-border text-foreground rounded-xl font-medium hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all text-sm">
          View Details
        </button>
      </div>
    </div>
  );
};

export default EventCard;
