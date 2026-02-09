<script setup lang="ts">
import type { KbdProps } from "../types/kbd";

const { tokens } = defineProps<KbdProps>();

</script>

<template>
  <kbd class="f-kbd">
    <slot />
  </kbd>
</template>

