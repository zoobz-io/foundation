<script setup lang="ts">
import type { NavProps } from "../types/nav";

const { tokens } = defineProps<NavProps>();

</script>

<template>
  <nav class="f-nav">
    <slot />
  </nav>
</template>

