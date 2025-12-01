<script lang="ts">
export interface H6Props {
  tokens?: Tokens<"h6">;
}
</script>

<script setup lang="ts">
const { tokens } = defineProps<H6Props>();

const styles = useTokenStyle(tokens);
</script>

<template>
  <h6 :style="styles.h6" class="f-h6">
    <slot />
  </h6>
</template>

<style>
@import '#build/untheme/h6.css';
</style>
