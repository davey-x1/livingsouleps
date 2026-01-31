"use client";
import React, { useState, useEffect, useRef } from "react";

interface TypewriterProps {
  text: string;
  typingSpeed?: number; // Velocidad de escritura en milisegundos por carácter
  finalizado?: (tipo: boolean) => void;
}

const Typewriter: React.FC<TypewriterProps> = ({
  text,
  typingSpeed = 50,
  finalizado,
}) => {
  const [displayedText, setDisplayedText] = useState<string>("");
  const [isVisible, setIsVisible] = useState<boolean>(false); // Estado para saber si está visible
  const textRef = useRef<HTMLSpanElement>(null); // Referencia para el componente

  useEffect(() => {
    // Solo empezar el efecto de escritura si el componente es visible en pantalla
    if (isVisible) {
      let index = 0;

      // Reiniciar el texto al cambiar el prop `text`
      setDisplayedText("");

      const interval = setInterval(() => {
        if (index >= text.length) {
          if (finalizado) {
            finalizado(true);
          }
        }
        if (index < text.length) {
          setDisplayedText(text.slice(0, index + 1)); // Mostrar desde el inicio hasta el índice actual
          index++;
        } else {
          clearInterval(interval); // Detenemos el intervalo al finalizar
        }
      }, typingSpeed);

      return () => clearInterval(interval); // Limpiar el intervalo al desmontar o cambiar el texto
    }
  }, [isVisible, text, typingSpeed, finalizado]);

  // Configuración de Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting); // Detectar si el componente está visible
      },
      {
        threshold: 0.4, // Umbral del 40% de visibilidad
      }
    );

    if (textRef.current) {
      observer.observe(textRef.current); // Observar el elemento
    }

    // Limpiar el observer cuando el componente se desmonte
    return () => {
      if (textRef.current) {
        observer.unobserve(textRef.current);
      }
    };
  }, []);

  return <span ref={textRef}>{displayedText}</span>;
};

export default Typewriter;
