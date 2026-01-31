"use client"; // Necesario en Next.js 13+

import { useEffect, useRef, useState } from "react";

interface ScrollSectionProps {
  id: string;
  className?: string;
  activeClass: string;
  children: React.ReactNode;
}

export default function ScrollSection({ id, className = "", activeClass, children }: ScrollSectionProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting && entry.intersectionRatio > 0.4);
        });
      },
      { threshold: [0, 0.4, 1] } // Detecta cuando el 40% de la sección es visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id={id} ref={sectionRef} className={`${className} ${isVisible ? activeClass : ""}`}>
      {children}
    </section>
  );
}
