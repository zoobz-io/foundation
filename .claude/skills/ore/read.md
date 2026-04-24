# ore read

Find the right ore element for a use case: `$target`

## Step 1 — Understand Intent

Parse what the user is looking for. They may describe:
- A semantic purpose ("I need a dismissable tag")
- An HTML concept ("something for navigation links")
- A visual role ("a container with elevation")
- A specific element by name ("show me Button")

If they name a specific element, skip to Step 3.

## Step 2 — Decision Table

Match the user's intent against element categories:

| Need | Elements | Key Differentiator |
|------|----------|-------------------|
| **Block container** | card, container, group, section, article, aside, main | card = elevated surface, container = max-width centering, group = flex layout, section/article/aside/main = semantic HTML5 |
| **Inline text** | span, strong, em, del, kbd, code, caption, label | strong = importance, em = emphasis, del = deleted, kbd = keyboard, code = inline code, caption = figure caption, label = form label |
| **Heading** | h1, h2, h3, h4, h5, h6 | Semantic heading level |
| **Interactive** | button, input, anchor | button = action, input = form field, anchor = navigation (wraps NuxtLink) |
| **Media** | img, icon | img = raster/vector image, icon = iconic alias (mask/bg mode) |
| **Feedback** | alert, banner | alert = inline message (icon optional), banner = prominent notification (icon optional) |
| **Decoration** | hr, chip | hr = horizontal rule, chip = tag/badge (closable, composes Icon) |
| **Structure** | header, footer, nav | page/section landmarks |
| **List** | ol, ul, li | ordered, unordered, list item |
| **Table** | table, thead, tbody, tr, th, td | standard HTML table parts |
| **Preformatted** | pre, blockquote, p | pre = code blocks, blockquote = quotations, p = paragraph |

Suggest the best match and explain why. If none fit, suggest `/ore create`.

## Step 3 — Inspect

Read the matched element's files:
- Props: `layers/ore/app/types/{name}.ts`
- Component: `layers/ore/app/components/{Name}.vue`

Present:
- Name, HTML tag, CSS class (`f-{name}`)
- All props (modifiers + element-specific)
- Slot structure (default slot, void, named)
- Icon composition (if any)

## Step 4 — Usage Context

Search for where this element is used to show real examples:
- `Grep` for `<{Name}` in `layers/alloy/app/components/`
- `Grep` for `<{Name}` in `layers/forge/app/components/`
- Show 2-3 representative usages with file paths.
