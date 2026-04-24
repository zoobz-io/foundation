<script lang="ts">
import type { ContainerProps } from "../types/container";
</script>

<script setup lang="ts">
const { label, variant, size, color, radius, density, elevation } = defineProps<ContainerProps>();

const el = useTemplateRef("el");
defineExpose({ el });
</script>

<template>
  <div ref="el" :aria-label="label" :data-variant="variant" :data-size="size" :data-color="color" :data-radius="radius" :data-density="density" :data-elevation="elevation" class="f-container">
    <slot>{{ label }}</slot>
  </div>
</template>
