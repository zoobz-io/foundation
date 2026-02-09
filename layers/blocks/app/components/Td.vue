<script setup lang="ts">
import type { TdProps } from "../types/td";

const { tokens } = defineProps<TdProps>();

</script>

<template>
  <td class="f-td">
    <slot />
  </td>
</template>

