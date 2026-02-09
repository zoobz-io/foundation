<script setup lang="ts">
import type { UlProps } from "../types/ul";

const { tokens } = defineProps<UlProps>();

</script>

<template>
  <ul class="f-ul">
    <slot />
  </ul>
</template>

