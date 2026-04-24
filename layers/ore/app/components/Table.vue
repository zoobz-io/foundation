<script lang="ts">
import type { TableProps } from "../types/table";
</script>

<script setup lang="ts">
const { label, variant, size, color, radius, density, elevation } = defineProps<TableProps>();

const el = useTemplateRef("el");
defineExpose({ el });
</script>

<template>
  <div ref="el" :aria-label="label" :data-variant="variant" :data-size="size" :data-color="color" :data-radius="radius" :data-density="density" :data-elevation="elevation" class="f-table-wrapper">
    <table class="f-table">
      <slot />
    </table>
  </div>
</template>
