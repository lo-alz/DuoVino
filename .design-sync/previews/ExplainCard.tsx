import React from "react";
import { ExplainCard } from "@duovino/design-system";

/** An unrevealed "explain why" prompt. */
export const Prompt = () => (
  <ExplainCard
    topic="Mosel"
    prompt="Explain why Mosel Riesling can be both low in alcohol and intensely flavoured."
  />
);

/** The revealed model answer with its required points. */
export const Revealed = () => (
  <ExplainCard
    topic="Mosel"
    prompt="Explain why Mosel Riesling can be both low in alcohol and intensely flavoured."
    revealed
    requiredPoints={[
      "Cool climate → slow ripening",
      "High acidity balances residual sugar",
      "Steep slate slopes maximise sun",
      "Long hang time builds flavour",
    ]}
  />
);
