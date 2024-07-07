import { useEffect, useRef } from "react";

export const useIntersectionObserver = (callback: () => void) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const targetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        callback();
      }
    });

    const currentTarget = targetRef.current;

    if (currentTarget) {
      observerRef.current.observe(currentTarget);
    }

    return () => {
      if (observerRef.current && currentTarget) {
        observerRef.current.unobserve(currentTarget);
      }
    };
  }, [callback]);

  return targetRef;
};
