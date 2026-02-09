<script setup lang="ts">
import type { BlockquoteProps } from "../types/blockquote";

const { tokens } = defineProps<BlockquoteProps>();

</script>

<template>
  <blockquote class="f-blockquote">
    <slot />
  </blockquote>
</template>

