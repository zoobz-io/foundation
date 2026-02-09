<script setup lang="ts">
import type { IconProps } from "../types/icon";

const { alias } = defineProps<IconProps>();

const icon = computed(() => useIconAlias(alias));

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
</script>

<template>
  <i class="f-icon" :style="iconStyle" />
</template>

