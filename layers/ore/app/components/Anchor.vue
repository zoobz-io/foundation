<script lang="ts">
import type { AnchorProps } from "../types/anchor";
</script>

<script setup lang="ts">
const { label, to, external, target, replace, prefetch, disabled, ariaCurrent, variant, size, color, radius, density, elevation } =
  defineProps<AnchorProps>();

const el = useTemplateRef("el");
defineExpose({ el });
</script>

<template>
  <NuxtLink
    ref="el"
    :to="disabled ? undefined : to"
    :external="external"
    :target="target"
    :replace="replace"
    :prefetch="prefetch"
    :aria-label="label"
    :aria-disabled="disabled"
    :aria-current="ariaCurrent ?? (disabled ? 'page' : undefined)"
    :data-variant="variant"
    :data-size="size"
    :data-color="color"
    :data-radius="radius"
    :data-density="density"
    :data-elevation="elevation"
    class="f-a"
  >
    <slot>
      {{ label }}
    </slot>
  </NuxtLink>
</template>
