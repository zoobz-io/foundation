<script setup lang="ts">
import type { StrongProps } from "../types/strong";

const { tokens } = defineProps<StrongProps>();

</script>

<template>
  <strong class="f-strong">
    <slot />
  </strong>
</template>

