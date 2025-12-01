<script lang="ts">
export interface TableProps {
  tokens?: Tokens<"table">;
}
</script>

<script setup lang="ts">
const { tokens } = defineProps<TableProps>();

const styles = useTokenStyle(tokens);
</script>

<template>
  <table :style="styles.table" class="f-table">
    <slot />
  </table>
</template>

<style>
@import '#build/untheme/table.css';
</style>
