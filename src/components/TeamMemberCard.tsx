import { cn } from "@/lib/utils";
import { LazyLoadImage } from "./LazyLoadImage";

interface TeamMemberCardProps {
  name: string;
  role: string;
  college: string;
  imageUrl: string;
  className?: string;
  style?: React.CSSProperties;
}

const TeamMemberCard = ({ name, role, college, imageUrl, className, style }: TeamMemberCardProps) => {
  return (
    <div 
      className={cn(
        "group royal-card relative overflow-hidden rounded-2xl bg-card border border-border/50 transition-all duration-700 hover:border-primary/50 hover:shadow-elegant",
        className
      )}
      style={style}
    >
      {/* Background Accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Image Container */}
      <div className="relative aspect-[1/1] overflow-hidden">
        <LazyLoadImage
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/90 via-espresso/30 to-transparent" />
        
        {/* Role Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1.5 bg-primary text-primary-foreground text-xs font-medium rounded-full uppercase tracking-wider">
            {role}
          </span>
        </div>
      </div>
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5 text-butter">
        <h3 className="font-display text-xl font-semibold mb-1">{name}</h3>
        <p className="text-butter/70 text-sm">{college}</p>
      </div>
    </div>
  );
};

export default TeamMemberCard;
