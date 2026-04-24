<script lang="ts">
import type { ChipProps } from "../types/chip";
</script>

<script setup lang="ts">
const { label, closable, disabled, ariaPressed, ariaSelected, variant, size, color, radius, density, elevation } = defineProps<ChipProps>();

const el = useTemplateRef("el");
defineExpose({ el });
</script>

<template>
  <button ref="el" type="button" :aria-label="label" :aria-pressed="ariaPressed" :aria-selected="ariaSelected" :disabled="disabled" :data-closable="closable || undefined" :data-variant="variant" :data-size="size" :data-color="color" :data-radius="radius" :data-density="density" :data-elevation="elevation" class="f-chip">
    <slot>{{ label }}</slot>
    <Icon v-if="closable" alias="close" class="f-chip-close" />
  </button>
</template>
