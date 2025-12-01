<script lang="ts">
export interface StrongProps {
  tokens?: Tokens<"strong">;
}
</script>

<script setup lang="ts">
const { tokens } = defineProps<StrongProps>();

const styles = useTokenStyle(tokens);
</script>

<template>
  <strong :style="styles.strong" class="f-strong">
    <slot />
  </strong>
</template>

<style>
@import '#build/untheme/strong.css';
</style>
