import React from "react";
import { ChainTable } from "./ChainTable";

export interface KkpCardProps {
  id: string;
  cat: "fact" | "relationship" | "comparison" | string;
  statement: string;
  verified?: boolean;
  chain?: { label: string; value: string }[];
}

/** A "key knowledge point" card: a single statement tagged by category, optionally unverified, with an optional reasoning chain. */
export function KkpCard({ id, cat, statement, verified, chain }: KkpCardProps) {
  const cls = cat === "relationship" ? "rel" : cat === "comparison" ? "cmp" : "";
  const tagCls = cat === "relationship" ? "rel" : cat === "comparison" ? "cmp" : "fact";
  return (
    <div className={`kkp ${cls}`}>
      <div className="ktop">
        <span className={`tag ${tagCls}`}>{cat}</span>
        {verified === false ? (
          <span className="tag" style={{ color: "var(--rose)", borderColor: "var(--garnet)" }}>
            unverified
          </span>
        ) : null}
        <span className="kid">{id}</span>
      </div>
      <div className="kst">{statement}</div>
      {chain ? <ChainTable steps={chain} /> : null}
    </div>
  );
}
