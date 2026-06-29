import React from "react";

export interface SectionHeadProps {
  title: string;
  link?: string;
  onLink?: () => void;
}

/**
 * A section header pairing a title with an optional trailing action link,
 * used to introduce and navigate content groups.
 */
export function SectionHead({ title, link, onLink }: SectionHeadProps) {
  return (
    <div className="sec-h">
      <h3>{title}</h3>
      {link ? (
        <span className="link" onClick={onLink}>
          {link}
        </span>
      ) : null}
    </div>
  );
}
