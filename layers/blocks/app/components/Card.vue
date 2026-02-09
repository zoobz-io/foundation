<script setup lang="ts">
import type { CardProps } from "../types/card";

const { tokens } = defineProps<CardProps>();

</script>

<template>
  <div class="f-card">
    <slot />
  </div>
</template>

