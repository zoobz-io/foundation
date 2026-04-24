# ore create

Create a new ore element from the user's description: `$target`

## Step 1 — Parse Intent

Extract from the description:
- **HTML tag** — which native element does this wrap?
- **Semantic purpose** — what is this element for?
- **Element-specific props** — beyond modifiers, what does it need? (label, src, icon, etc.)
- **Slot structure** — does it have a default slot? Is it void (img, hr, input)?
- **Icon composition** — does it need an internal Icon? (presentational only)

## Step 2 — Validate

Before proceeding, check ALL of the following. If any fail, stop and explain why.

**Boundary check** — Does this need JS to function?
- Event handlers, state, computed values, watchers = belongs in **alloy**, not ore
- Icon composition is fine IF purely presentational (no @click, no v-if on state)

**Overlap check** — Use `Glob` for `layers/ore/app/components/*.vue` to list existing elements.

Ask: does an existing element already serve this semantic purpose?
- `div` wrappers: card, container, group, section, article, aside, main, alert, banner
- `span`-like: span, strong, em, del, kbd, code, caption, label
- Interactive: button, input, anchor
- Media: img, icon
- Structure: header, footer, nav, hr
- Lists: ol, ul, li
- Tables: table, thead, tbody, tr, th, td

If there's overlap, explain which existing element covers the use case.

**Name check** — Does the name conflict with HTML tags, Vue builtins, or existing components?

**Tag check** — Is the HTML tag already wrapped by another element with the same tag?
Multiple elements CAN share a tag if they have distinct semantic purposes (e.g., card and container both use `div`).

## Step 3 — Present Plan

Show the user what will be created using [the template](templates/create.md).
Fill in all fields. Wait for confirmation before writing any files.

## Step 4 — Execute

Only after user confirms:

1. Add the element name to the `OreElements` union in `layers/ore/app/types/modifiers.ts`
2. Create `layers/ore/app/types/{name}.ts` with the `{Name}Props` type
3. Create `layers/ore/app/components/{Name}.vue` with the component

Follow the exact patterns from existing elements. Match the style of the closest
analog (e.g., if creating a void element, reference Img or Hr; if composing Icon,
reference Alert or Chip).
