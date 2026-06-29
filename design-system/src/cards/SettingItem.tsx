import React from "react";

export interface SettingItemProps {
  icon: string;
  title: string;
  desc: string;
  onSelect?: () => void;
}

/**
 * A single settings row pairing a leading icon with a title and description,
 * trailed by a chevron to signal it opens a deeper screen.
 */
export function SettingItem({ icon, title, desc, onSelect }: SettingItemProps) {
  return (
    <button className="setitem" onClick={onSelect}>
      <span className="seticon">{icon}</span>
      <span className="settx">
        <b>{title}</b>
        <span>{desc}</span>
      </span>
      <span className="setarrow">›</span>
    </button>
  );
}
