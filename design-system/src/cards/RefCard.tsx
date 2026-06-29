import React from "react";

export interface RefCardProps {
  name: string;
  tag?: string;
  imgSrc: string;
  onSelect?: () => void;
}

/**
 * A reference card with a lazy-loaded thumbnail above a name and optional tag;
 * the image quietly hides itself if the source fails to load.
 */
export function RefCard({ name, tag, imgSrc, onSelect }: RefCardProps) {
  return (
    <button className="refcard" onClick={onSelect}>
      <img
        className="rcimg"
        src={imgSrc}
        alt={name}
        loading="lazy"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = "none";
        }}
      />
      <div className="rcb">
        <div className="rcn">{name}</div>
        <div className="rct">{tag || ""}</div>
      </div>
    </button>
  );
}
