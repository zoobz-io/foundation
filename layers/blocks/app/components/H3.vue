<script setup lang="ts">
import type { H3Props } from "../types/h3";

const { tokens } = defineProps<H3Props>();

</script>

<template>
  <h3 class="f-h3">
    <slot />
  </h3>
</template>

