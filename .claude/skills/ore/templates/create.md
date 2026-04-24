## New Element: {Name}

| Field | Value |
|-------|-------|
| **HTML tag** | `{tag}` |
| **CSS class** | `f-{name}` |
| **Semantic purpose** | {description} |
| **Slot** | {default / void / named} |
| **Icon composition** | {yes (presentational) / no} |

### Props

| Prop | Type | Notes |
|------|------|-------|
| variant? | `OreVariants["{name}"]` | modifier |
| size? | `OreSizes["{name}"]` | modifier |
| color? | `OreColors["{name}"]` | modifier |
| radius? | `OreRadius["{name}"]` | modifier |
| density? | `OreDensity["{name}"]` | modifier |
| elevation? | `OreElevation["{name}"]` | modifier |
| {prop}? | `{type}` | {notes} |

### Files to create

- `layers/ore/app/types/{name}.ts`
- `layers/ore/app/components/{Name}.vue`
- Update `OreElements` union in `layers/ore/app/types/modifiers.ts`

### Closest analog

{existing element name} — {why it's similar, what pattern to follow}

Confirm to proceed?
