# AGENTS.md — src/lib/renderers/

OVERVIEW: Versioned RadioBox renderer components, one directory per season range.

## STRUCTURE

```
renderers/
  current.ts          # re-exports active renderer (currently ./2025-current/index)
  2025-current/
    RadioBox.svelte
    RadioBoxMessage.svelte
    index.ts
  2022-2024/
    RadioBox.svelte
    RadioBoxMessage.svelte
    index.ts
```

## WHERE TO LOOK

- **Active renderer**: `current.ts` — single re-export; edit this to switch seasons
- **Season logic**: each versioned directory is self-contained
- **PNG export**: `element` bindable prop on `RadioBox` — passed to `dom-to-image`

## KEY PROPS

### RadioBox

| Prop | Type | Notes |
|------|------|-------|
| `driver` | `Driver` | Season driver object |
| `children` | `Snippet` (optional) | Rendered `RadioBoxMessage` nodes |
| `element` | `HTMLElement \| undefined` (bindable) | Bound by parent for PNG export |

### RadioBoxMessage

| Prop | Type | Notes |
|------|------|-------|
| `type` | `'driver' \| 'team'` | Controls alignment and color |
| `text` | `string` | Message content |

Message alignment: driver messages are right-aligned in team color; team messages are left-aligned in white.

## CONVENTIONS

- Each renderer directory exports `RadioBox` and `RadioBoxMessage` from its `index.ts`
- `2025-current` uses Svelte 5 runes and Tailwind CSS v4; styling via `--team-color` CSS variable
- `2022-2024` uses Svelte scoped `<style>` blocks with no Tailwind dependency
- Audio wave in `2025-current`: 9 bars, sine curve with seeded random noise, colored via `--team-color`
- Audio wave in `2022-2024`: 50 bars rendered in a CSS grid with skewed typography

## ANTI-PATTERNS

- Do not import from a versioned directory directly — always import through `current.ts`
- Do not edit `current.ts` for anything other than switching the active season
- Do not add shared logic between renderer versions; keep each directory fully self-contained
- Do not add Tailwind classes to `2022-2024` or scoped CSS to `2025-current`

## ADDING A NEW SEASON

1. Create `renderers/<year>/RadioBox.svelte`, `RadioBoxMessage.svelte`, and `index.ts`
2. Match the `RadioBox` and `RadioBoxMessage` prop signatures above
3. Update `current.ts` to re-export from the new directory
