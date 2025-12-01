<script lang="ts">
export interface H1Props {
  tokens?: Tokens<"h1">;
}
</script>

<script setup lang="ts">
const { tokens } = defineProps<H1Props>();

const styles = useTokenStyle(tokens);
</script>

<template>
  <h1 :style="styles.h1" class="f-h1">
    <slot />
  </h1>
</template>

<style>
@import '#build/untheme/h1.css';
</style>
