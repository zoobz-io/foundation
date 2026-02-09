<script setup lang="ts">
import type { H5Props } from "../types/h5";

const { tokens } = defineProps<H5Props>();

</script>

<template>
  <h5 class="f-h5">
    <slot />
  </h5>
</template>

