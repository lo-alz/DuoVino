import React from "react";
import { Glass } from "@duovino/design-system";

/** Empty glass — a region not yet studied. */
export const Empty = () => <Glass pct={0} width={56} />;
/** Filling — partial mastery. */
export const Filling = () => <Glass pct={45} width={56} />;
/** Full — region mastered. */
export const Mastered = () => <Glass pct={100} width={56} />;
