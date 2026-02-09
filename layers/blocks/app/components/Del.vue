<script setup lang="ts">
import type { DelProps } from "../types/del";

const { tokens } = defineProps<DelProps>();

</script>

<template>
  <del class="f-del">
    <slot />
  </del>
</template>

