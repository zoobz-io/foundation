<script setup lang="ts">
export interface CardProps {
  tokens?: Tokens<"card">;
}

const { tokens } = defineProps<CardProps>();

const styles = useTokenStyle(tokens);
</script>

<template>
  <div :style="styles.card" class="f-card">
    <slot />
  </div>
</template>

<style>
@import '#build/untheme/card.css';
</style>
