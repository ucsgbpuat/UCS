import { ReactNode } from "react";
import { useLazyLoad } from "@/hooks/useLazyLoad";

interface LazyLoadContentProps {
  children: ReactNode;
  className?: string;
  animation?: string;
  delay?: string;
}

export const LazyLoadContent = ({
  children,
  className = "",
  animation = "animate-royal-slide-in",
  delay = "0s",
}: LazyLoadContentProps) => {
  const { ref, isVisible } = useLazyLoad();

  return (
    <div
      ref={ref}
      className={`${isVisible ? animation : "opacity-0"} ${className}`}
      style={{ animationDelay: delay }}
    >
      {children}
    </div>
  );
};
