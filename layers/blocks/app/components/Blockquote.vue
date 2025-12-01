<script lang="ts">
export interface BlockquoteProps {
  tokens?: Tokens<"blockquote">;
}
</script>

<script setup lang="ts">
const { tokens } = defineProps<BlockquoteProps>();

const styles = useTokenStyle(tokens);
</script>

<template>
  <blockquote :style="styles.blockquote" class="f-blockquote">
    <slot />
  </blockquote>
</template>

<style>
@import '#build/untheme/blockquote.css';
</style>
