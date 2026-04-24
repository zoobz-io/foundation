<script lang="ts">
import type { IconProps } from "../types/icon";
</script>

<script setup lang="ts">
const { alias, label, variant, size, color, radius, density, elevation } = defineProps<IconProps>();

const icon = computed(() => useIconAlias(alias) ?? useIconAlias("warning"));

const iconStyle = computed(() => {
  const { uri, mode } = icon.value;

  if (mode === "mask") {
    return {
      maskImage: `url("${uri}")`,
      maskRepeat: "no-repeat",
      maskPosition: "center",
      maskSize: "contain",
      WebkitMaskImage: `url("${uri}")`,
      WebkitMaskRepeat: "no-repeat",
      WebkitMaskPosition: "center",
      WebkitMaskSize: "contain",
      backgroundColor: "currentColor",
    };
  }

  return {
    backgroundImage: `url("${uri}")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "contain",
  };
});

const el = useTemplateRef("el");
defineExpose({ el });
</script>

<template>
  <i ref="el" :aria-hidden="!label" :aria-label="label || undefined" :role="label ? 'img' : undefined" :data-variant="variant" :data-size="size" :data-color="color" :data-radius="radius" :data-density="density" :data-elevation="elevation" class="f-icon" :style="iconStyle" />
</template>
