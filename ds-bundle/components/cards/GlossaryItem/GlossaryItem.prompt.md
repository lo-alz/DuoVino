GlossaryItem from @duovino/design-system. Use via `window.DuoVino.GlossaryItem` (bundle loaded from the root `_ds_bundle.js`).

A glossary entry pairing a term with its definition, with an optional inline
language tag for terms borrowed from another tongue.

## Props

```ts
interface GlossaryItemProps {
  term: string;
  language?: string;
  def: string;
}
```

## Examples

### Crianza

```jsx
() => (
  <GlossaryItem
    term="Crianza"
    language="Spanish"
    def="A Rioja ageing category: min. 2 years, at least 1 in oak."
  />
)
```
