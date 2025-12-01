<script lang="ts">
export interface TdProps {
  tokens?: Tokens<"td">;
}
</script>

<script setup lang="ts">
const { tokens } = defineProps<TdProps>();

const styles = useTokenStyle(tokens);
</script>

<template>
  <td :style="styles.td" class="f-td">
    <slot />
  </td>
</template>

<style>
@import '#build/untheme/td.css';
</style>
