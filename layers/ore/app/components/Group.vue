<script lang="ts">
import type { GroupProps } from "../types/group";
</script>

<script setup lang="ts">
const { label, variant, size, color, radius, density, elevation } = defineProps<GroupProps>();

const el = useTemplateRef("el");
defineExpose({ el });
</script>

<template>
  <div ref="el" :aria-label="label" :data-variant="variant" :data-size="size" :data-color="color" :data-radius="radius" :data-density="density" :data-elevation="elevation" class="f-group">
    <slot>{{ label }}</slot>
  </div>
</template>
