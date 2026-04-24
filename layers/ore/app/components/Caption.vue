<script lang="ts">
import type { CaptionProps } from "../types/caption";
</script>

<script setup lang="ts">
const { label, icon, variant, size, color, radius, density, elevation } = defineProps<CaptionProps>();

const el = useTemplateRef("el");
defineExpose({ el });
</script>

<template>
  <div ref="el" :aria-label="label" :data-variant="variant" :data-size="size" :data-color="color" :data-radius="radius" :data-density="density" :data-elevation="elevation" class="f-caption">
    <Icon v-if="icon" :alias="icon" />
    <slot>{{ label }}</slot>
  </div>
</template>
