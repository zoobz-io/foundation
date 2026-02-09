<script setup lang="ts">
import type { ChipProps } from "../types/chip";

const { label } = defineProps<ChipProps>();

</script>

<template>
  <span class="f-chip">
    <slot>{{ label }}</slot>
  </span>
</template>

