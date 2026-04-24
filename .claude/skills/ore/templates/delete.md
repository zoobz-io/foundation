## Delete Element: {Name}

### Dependency Report

| Location | File | Usage |
|----------|------|-------|
| {layer} | {file path} | {how it's used} |

**Total dependents: {count}**

### Files to remove

- `layers/ore/app/types/{name}.ts`
- `layers/ore/app/components/{Name}.vue`
- Remove `"{name}"` from `OreElements` union in `layers/ore/app/types/modifiers.ts`

{If dependents > 0: "This element has active dependents. Removing it will break the files listed above. Confirm to proceed?"}
{If dependents = 0: "No dependents found. Confirm to proceed?"}
