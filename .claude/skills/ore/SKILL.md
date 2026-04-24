---
name: ore
description: >
  Manage ore elements — the foundational 1:1 HTML wrappers in layers/ore/.
  Use when creating, inspecting, modifying, or removing elements.
  Elements are behavior-free HTML wrappers with a modifier system.
  If JS behavior is needed, redirect to /alloy.
argument-hint: [action] [description-or-name]
arguments: [action, target]
allowed-tools: Read Grep Glob Write Edit
---

# Ore — Element Management

Route on `$action`: **create** | **read** | **update** | **delete**

- If action is "create": follow [create.md](create.md)
- If action is "read": follow [read.md](read.md)
- If action is "update": follow [update.md](update.md)
- If action is "delete": follow [delete.md](delete.md)

## What is an Element?

An ore element wraps exactly one HTML tag with Foundation's modifier system.
It has **no JavaScript behavior** — if it needs JS to function, it belongs in alloy.

Every element consists of:
- **Type file**: `layers/ore/app/types/{name}.ts` — exports `{Name}Props`
- **Component file**: `layers/ore/app/components/{Name}.vue`
- **Registration**: entry in `OreElements` union in `layers/ore/app/types/modifiers.ts`

## Modifier System

Six modifier props typed via module-augmented interfaces (default `never`):
`variant`, `size`, `color`, `radius`, `density`, `elevation`

Each binds to a `data-*` attribute. Consumers augment `OreVariants`, `OreSizes`,
`OreColors`, `OreRadius`, `OreDensity`, `OreElevation` to define allowed values.

## Element Anatomy

**Props**: modifiers + semantic props (label, src, icon, disabled, type, etc.)
**Component**: split script, `useTemplateRef("el")` + `defineExpose({ el })`,
single root with `class="f-{name}"`, modifier `data-*` bindings, default `<slot />`.

Void elements (img, hr, input) have no slot. Some compose `Icon` internally
(Alert, Banner, Caption, Chip) — allowed only if purely presentational.

## Existing Elements

Use `Glob` for `layers/ore/app/components/*.vue` to list all current elements.

## Rules

1. Never duplicate an existing element's semantic purpose
2. Every prop must be declarative — no interaction state, no callbacks
3. Icon composition is allowed only if presentational (no click handlers)
4. `f-{name}` class is the sole styling hook — no scoped styles
5. All elements expose `el` via `defineExpose({ el })`
6. Split script pattern: imports in `<script lang="ts">`, logic in `<script setup lang="ts">`
