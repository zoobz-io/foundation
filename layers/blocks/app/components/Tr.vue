<script setup lang="ts">
import type { TrProps } from "../types/tr";

const { tokens } = defineProps<TrProps>();

</script>

<template>
  <tr class="f-tr">
    <slot />
  </tr>
</template>

