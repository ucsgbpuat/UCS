import { useState } from "react";
import { useLazyLoad } from "@/hooks/useLazyLoad";

interface LazyLoadImageProps {
  src: string;
  alt: string;
  className?: string;
  onLoad?: () => void;
}

export const LazyLoadImage = ({ src, alt, className = "", onLoad }: LazyLoadImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { ref, isVisible } = useLazyLoad();

  const handleLoadedImage = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setImageError(true);
  };

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden bg-muted/30 ${className}`}
    >
      {/* Loading placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-muted via-muted/50 to-muted animate-pulse" />
      )}

      {/* Actual image */}
      {isVisible && !imageError && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={handleLoadedImage}
          onError={handleError}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            isLoaded ? "opacity-100" : "opacity-0"
          } ${className}`}
        />
      )}

      {/* Error fallback */}
      {imageError && (
        <div className="w-full h-full flex items-center justify-center bg-muted/50">
          <span className="text-muted-foreground text-sm">Image failed to load</span>
        </div>
      )}
    </div>
  );
};
