<script setup lang="ts">
import type { H1Props } from "../types/h1";

const { tokens } = defineProps<H1Props>();

</script>

<template>
  <h1 class="f-h1">
    <slot />
  </h1>
</template>

