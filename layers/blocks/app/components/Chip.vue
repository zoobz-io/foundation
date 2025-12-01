<script lang="ts">
export interface ChipProps {
  label?: string;
  tokens?: Tokens<"chip">;
}
</script>

<script setup lang="ts">
const { label, tokens } = defineProps<ChipProps>();

const styles = useTokenStyle(tokens);
</script>

<template>
  <span :style="styles.chip" class="f-chip">
    <slot>{{ label }}</slot>
  </span>
</template>

<style>
@import '#build/untheme/chip.css';
</style>
