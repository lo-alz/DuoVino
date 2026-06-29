Hero from @duovino/design-system. Use via `window.DuoVino.Hero` (bundle loaded from the root `_ds_bundle.js`).

The mastery hero banner — a filling wine glass paired with a headline tally
and encouraging message to summarize overall progress.

## Props

```ts
interface HeroProps {
  pct: number;
  mastered: number;
  total: number;
  message: string;
}
```

## Examples

### Default

```jsx
() => (
  <Hero
    pct={42}
    mastered={118}
    total={280}
    message="Filling steadily — keep closing the gaps below."
  />
)
```
