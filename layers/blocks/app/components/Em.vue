<script setup lang="ts">
import type { EmProps } from "../types/em";

const { tokens } = defineProps<EmProps>();

</script>

<template>
  <em class="f-em">
    <slot />
  </em>
</template>

