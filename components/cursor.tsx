"use client";

import { useState, useEffect } from "react";

export default function Cursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorHover, setCursorHover] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className="fixed pointer-events-none z-[100] hidden lg:block"
      style={{
        transform: `translate(${mousePosition.x - (cursorHover ? 28 : 20)}px, ${mousePosition.y - (cursorHover ? 28 : 20)}px) scale(${cursorHover ? 1.8 : 1})`,
        transition: "transform 0.15s ease-out",
      }}
    >
      <div
        className="w-10 h-10 rounded-full border-2"
        style={{
          borderColor: cursorHover
            ? "hsl(198 96% 30%)"
            : "hsl(198 96% 53%)",
          boxShadow: cursorHover
            ? "0 0 25px hsla(var(--neon-green), 0.7)"
            : "0 0 20px hsla(var(--neon-green), 0.5)",
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{
          backgroundColor: cursorHover
            ? "hsl(198 96% 30%)"
            : "hsl(198 96% 53%)",
          boxShadow: cursorHover
            ? "0 0 12px hsla(var(--neon-green), 1)"
            : "0 0 8px hsla(var(--neon-green), 0.8)",
        }}
      />
    </div>
  );
}

export function useCursorHover() {
  const [cursorHover, setCursorHover] = useState(false);
  return { cursorHover, setCursorHover };
}
