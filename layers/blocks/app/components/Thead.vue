<script setup lang="ts">
import type { TheadProps } from "../types/thead";

const { tokens } = defineProps<TheadProps>();

</script>

<template>
  <thead class="f-thead">
    <slot />
  </thead>
</template>

