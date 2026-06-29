import React from "react";

export interface BottomNavProps {
  active: string;
  onNavigate?: (key: string) => void;
}

/**
 * The fixed bottom tab bar with five primary destinations, marking the active
 * tab and emitting navigation events.
 */
export function BottomNav({ active, onNavigate }: BottomNavProps) {
  return (
    <nav className="nav">
      <div className="max">
        <button
          data-nav="dash"
          className={active === "dash" ? "on" : undefined}
          onClick={() => onNavigate?.("dash")}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
            <path d="M3 13h8V3H3zM13 21h8V3h-8zM3 21h8v-6H3z" />
          </svg>
          <span>DuoVino</span>
          <div className="nv-ind"></div>
        </button>
        <button
          data-nav="learn"
          className={active === "learn" ? "on" : undefined}
          onClick={() => onNavigate?.("learn")}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
            <path d="M4 5a2 2 0 012-2h12v17H6a2 2 0 00-2 2z" />
            <path d="M18 3v17" />
          </svg>
          <span>Learn</span>
          <div className="nv-ind"></div>
        </button>
        <button
          data-nav="study"
          className={active === "study" ? "on" : undefined}
          onClick={() => onNavigate?.("study")}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
            <path d="M12 3l8 4-8 4-8-4z" />
            <path d="M6 9v5c0 1.5 3 3 6 3s6-1.5 6-3V9" />
          </svg>
          <span>Study</span>
          <div className="nv-ind"></div>
        </button>
        <button
          data-nav="map"
          className={active === "map" ? "on" : undefined}
          onClick={() => onNavigate?.("map")}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
            <path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2z" />
            <path d="M9 4v14M15 6v14" />
          </svg>
          <span>Map</span>
          <div className="nv-ind"></div>
        </button>
        <button
          data-nav="compare"
          className={active === "compare" ? "on" : undefined}
          onClick={() => onNavigate?.("compare")}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
            <rect x="4" y="4" width="6" height="16" rx="1" />
            <rect x="14" y="4" width="6" height="16" rx="1" />
          </svg>
          <span>Compare</span>
          <div className="nv-ind"></div>
        </button>
      </div>
    </nav>
  );
}
