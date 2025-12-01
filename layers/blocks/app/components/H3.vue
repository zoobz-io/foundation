<script lang="ts">
export interface H3Props {
  tokens?: Tokens<"h3">;
}
</script>

<script setup lang="ts">
const { tokens } = defineProps<H3Props>();

const styles = useTokenStyle(tokens);
</script>

<template>
  <h3 :style="styles.h3" class="f-h3">
    <slot />
  </h3>
</template>

<style>
@import '#build/untheme/h3.css';
</style>
