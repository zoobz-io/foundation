<script setup lang="ts">
import type { H6Props } from "../types/h6";

const { tokens } = defineProps<H6Props>();

</script>

<template>
  <h6 class="f-h6">
    <slot />
  </h6>
</template>

