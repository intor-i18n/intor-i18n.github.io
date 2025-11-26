"use client";

import * as React from "react";
import "./spotlight-card.css";
import { cn } from "@/applications/shadcn/lib/utils";
import { Card } from "@/interfaces/components/shadcn/card";

interface SpotlightCardProps extends React.PropsWithChildren {
  className?: string;
  spotlightColor?: `rgba(${number}, ${number}, ${number}, ${number})`;
}

export function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(108, 173, 198, 0.2)",
}: SpotlightCardProps) {
  const divRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!divRef.current) return;

    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    divRef.current.style.setProperty("--mouse-x", `${x}px`);
    divRef.current.style.setProperty("--mouse-y", `${y}px`);
    divRef.current.style.setProperty("--spotlight-color", spotlightColor);
  };

  return (
    <Card
      ref={divRef}
      onMouseMove={handleMouseMove}
      className={cn("card-spotlight", className)}
    >
      {children}
    </Card>
  );
}
