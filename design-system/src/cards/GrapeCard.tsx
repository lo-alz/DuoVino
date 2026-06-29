import React from "react";

export interface GrapeCardProps {
  name: string;
  color: "w" | "r";
  aka?: string[];
  stats: { label: string; value: string }[];
  onSelect?: () => void;
}

/**
 * A grape variety card colour-keyed white or red via its swatch, listing the
 * variety name, an optional a.k.a. synonym and a compact strip of key stats.
 */
export function GrapeCard({ name, color, aka, stats, onSelect }: GrapeCardProps) {
  return (
    <button className={`gcard ${color === "w" ? "w" : "r"}`} onClick={onSelect}>
      <span className="gctop">
        <span className={`gsw ${color === "w" ? "w" : "r"}`}></span>
        <span className="gnm">{name}</span>
      </span>
      {aka && aka.length ? <span className="gaka">a.k.a. {aka.slice(0, 1).join(", ")}</span> : ""}
      <span className="gmini">
        {stats.map((s) => (
          <span className="gst" key={s.label}>
            <span className="gk">{s.label}</span>{s.value}
          </span>
        ))}
      </span>
    </button>
  );
}
