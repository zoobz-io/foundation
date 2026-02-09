<script setup lang="ts">
import type { CodeProps } from "../types/code";

const { tokens } = defineProps<CodeProps>();

</script>

<template>
  <code class="f-code">
    <slot />
  </code>
</template>

