<script setup lang="ts">
import type { ThProps } from "../types/th";

const { tokens } = defineProps<ThProps>();

</script>

<template>
  <th class="f-th">
    <slot />
  </th>
</template>

