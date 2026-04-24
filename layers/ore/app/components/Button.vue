<script lang="ts">
import type { ButtonProps } from "../types/button";
</script>

<script setup lang="ts">
const { label, type = "button", disabled, ariaPressed, ariaExpanded, ariaHaspopup, variant, size, color, radius, density, elevation } = defineProps<ButtonProps>();

const el = useTemplateRef("el");
defineExpose({ el });
</script>

<template>
  <button ref="el" :type="type" :aria-label="label" :aria-pressed="ariaPressed" :aria-expanded="ariaExpanded" :aria-haspopup="ariaHaspopup" :disabled="disabled" :data-variant="variant" :data-size="size" :data-color="color" :data-radius="radius" :data-density="density" :data-elevation="elevation" class="f-button">
    <slot>{{ label }}</slot>
  </button>
</template>
