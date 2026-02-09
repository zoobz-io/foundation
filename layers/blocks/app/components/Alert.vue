<script setup lang="ts">
import type { AlertProps } from "../types/alert";

const { icon, variant = "note" } = defineProps<AlertProps>();
</script>

<template>
  <div :class="`f-alert-${variant}`">
    <span v-if="icon" :class="`f-alert-${variant}-icon`">
      <Icon :alias="icon" />
    </span>
    <slot />
  </div>
</template>

