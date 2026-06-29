CountryTile from @duovino/design-system. Use via `window.DuoVino.CountryTile` (bundle loaded from the root `_ds_bundle.js`).

A tappable country tile showing a flag, topic count and a slim progress bar,
used to navigate regional study areas.

## Props

```ts
interface CountryTileProps {
  name: string;
  flag?: string;
  topics: number;
  pct: number;
  onSelect?: () => void;
}
```

## Examples

### Spain

```jsx
() => <CountryTile name="Spain" flag="🇪🇸" topics={14} pct={38} />
```

### France

```jsx
() => <CountryTile name="France" flag="🇫🇷" topics={22} pct={61} />
```
