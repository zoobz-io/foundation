<script setup lang="ts">
import type { TableProps } from "../types/table";

const { tokens } = defineProps<TableProps>();

</script>

<template>
  <table class="f-table">
    <slot />
  </table>
</template>

