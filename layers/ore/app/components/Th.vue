<script lang="ts">
import type { ThProps } from "../types/th";
</script>

<script setup lang="ts">
const { scope, variant, size, color, radius, density, elevation } = defineProps<ThProps>();

const el = useTemplateRef("el");
defineExpose({ el });
</script>

<template>
  <th ref="el" :scope="scope" :data-variant="variant" :data-size="size" :data-color="color" :data-radius="radius" :data-density="density" :data-elevation="elevation" class="f-th">
    <slot />
  </th>
</template>
