<script lang="ts">
export interface HeaderProps {
  tokens?: Tokens<"header">;
}
</script>

<script setup lang="ts">
const { tokens } = defineProps<HeaderProps>();

const styles = useTokenStyle(tokens);
</script>

<template>
  <header :style="styles.header" class="f-header">
    <slot />
  </header>
</template>

<style>
@import '#build/untheme/header.css';
</style>
