<script lang="ts">
import type { BannerProps } from "../types/banner";
</script>

<script setup lang="ts">
const { label, role = "banner", icon, variant, size, color, radius, density, elevation } = defineProps<BannerProps>();

const el = useTemplateRef("el");
defineExpose({ el });
</script>

<template>
  <div ref="el" :role="role" :aria-label="label" :data-variant="variant" :data-size="size" :data-color="color" :data-radius="radius" :data-density="density" :data-elevation="elevation" class="f-banner">
    <Icon v-if="icon" :alias="icon" />
    <slot>{{ label }}</slot>
  </div>
</template>
