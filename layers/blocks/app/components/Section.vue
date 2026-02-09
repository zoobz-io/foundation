<script setup lang="ts">
import type { SectionProps } from "../types/section";

const { tokens } = defineProps<SectionProps>();

</script>

<template>
  <section class="f-section">
    <slot />
  </section>
</template>

