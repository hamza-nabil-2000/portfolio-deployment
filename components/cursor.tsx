"use client";

import { useState, useEffect } from "react";

export default function Cursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorHover, setCursorHover] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.closest("a") ||
          target.closest("button") ||
          target.closest(".neon-button") ||
          target.closest(".cursor-pointer") ||
          target.closest("[role='button']"))
      ) {
        setCursorHover(true);
      } else {
        setCursorHover(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className="fixed pointer-events-none z-[100] hidden lg:block"
      style={{
        transform: `translate(${mousePosition.x - 20}px, ${mousePosition.y - 20}px) scale(${cursorHover ? 2 : 1})`,
        transition: "transform 0.12s ease-out, scale 0.15s ease-out",
      }}
    >
      <div
        className="w-10 h-10 rounded-full border-2 transition-all duration-200"
        style={{
          borderColor: cursorHover ? "hsl(198 96% 60%)" : "hsl(198 96% 53%)",
          boxShadow: cursorHover
            ? "0 0 30px hsla(198, 96%, 60%, 0.9)"
            : "0 0 20px hsla(198, 96%, 53%, 0.5)",
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-200"
        style={{
          backgroundColor: cursorHover
            ? "hsl(198 96% 60%)"
            : "hsl(198 96% 53%)",
          boxShadow: cursorHover
            ? "0 0 15px hsla(198, 96%, 60%, 1)"
            : "0 0 8px hsla(198, 96%, 53%, 0.8)",
        }}
      />
    </div>
  );
}

export function useCursorHover() {
  const [cursorHover, setCursorHover] = useState(false);
  return { cursorHover, setCursorHover };
}
