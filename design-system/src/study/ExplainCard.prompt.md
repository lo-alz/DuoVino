ExplainCard from @duovino/design-system. Use via `window.DuoVino.ExplainCard` (bundle loaded from the root `_ds_bundle.js`).

An "explain why" card: a prompt that, when revealed, lists the points a complete answer needs and an optional reasoning chain.

## Props

```ts
interface ExplainCardProps {
  topic: string;
  prompt: string;
  requiredPoints?: string[];
  revealed?: boolean;
  chain?: { label: string; value: string; }[];
}
```

## Examples

### Prompt

```jsx
() => (
  <ExplainCard
    topic="Mosel"
    prompt="Explain why Mosel Riesling can be both low in alcohol and intensely flavoured."
  />
);

/** The revealed model answer with its required points. */
```

### Revealed

```jsx
() => (
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
)
```
