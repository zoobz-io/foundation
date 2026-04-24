# ore delete

Remove an ore element: `$target`

## Step 1 — Resolve

Find the element by name. Verify it exists:
- `layers/ore/app/types/{name}.ts`
- `layers/ore/app/components/{Name}.vue`
- Entry in `OreElements` union in `layers/ore/app/types/modifiers.ts`

If the element doesn't exist, stop and report.

## Step 2 — Dependency Check

Search for ALL usages across the codebase. This is mandatory — never skip.

- `Grep` for `<{Name}` (template usage) in layers/alloy, layers/forge, layers/foundry, layers/prose, apps/
- `Grep` for `{Name}Props` (type import) in the same locations
- `Grep` for `"{name}"` in modifiers.ts augmentation sites

## Step 3 — Report

Present findings using [the template](templates/delete.md):
- List every file that references this element
- Categorize: alloy components, forge widgets, foundry workspaces, prose, example app

**If dependents exist**: report them and DO NOT proceed unless the user explicitly
confirms they want to remove the element and handle the breakage.

**If no dependents**: confirm with the user before proceeding.

## Step 4 — Execute

Only after explicit user confirmation:

1. Remove from `OreElements` union in `layers/ore/app/types/modifiers.ts`
2. Delete `layers/ore/app/types/{name}.ts`
3. Delete `layers/ore/app/components/{Name}.vue`
