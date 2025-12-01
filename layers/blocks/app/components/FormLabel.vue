<script lang="ts">
export interface FormLabelProps {
  for?: string;
  tokens?: Tokens<"label">;
}
</script>

<script setup lang="ts">
const { for: htmlFor, tokens } = defineProps<FormLabelProps>();

const styles = useTokenStyle(tokens);
</script>

<template>
  <label :for="htmlFor" :style="styles.label" class="f-label">
    <slot />
  </label>
</template>

<style>
@import '#build/untheme/label.css';
</style>
