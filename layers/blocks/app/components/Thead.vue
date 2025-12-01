<script lang="ts">
export interface TheadProps {
  tokens?: Tokens<"thead">;
}
</script>

<script setup lang="ts">
const { tokens } = defineProps<TheadProps>();

const styles = useTokenStyle(tokens);
</script>

<template>
  <thead :style="styles.thead" class="f-thead">
    <slot />
  </thead>
</template>

<style>
@import '#build/untheme/thead.css';
</style>
