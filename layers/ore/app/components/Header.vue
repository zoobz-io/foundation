<script lang="ts">
import type { HeaderProps } from "../types/header";
</script>

<script setup lang="ts">
const { label, variant, size, color, radius, density, elevation } = defineProps<HeaderProps>();

const el = useTemplateRef("el");
defineExpose({ el });
</script>

<template>
  <header ref="el" :aria-label="label" :data-variant="variant" :data-size="size" :data-color="color" :data-radius="radius" :data-density="density" :data-elevation="elevation" class="f-header">
    <slot>{{ label }}</slot>
  </header>
</template>
