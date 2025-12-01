<script lang="ts">
export interface DelProps {
  tokens?: Tokens<"del">;
}
</script>

<script setup lang="ts">
const { tokens } = defineProps<DelProps>();

const styles = useTokenStyle(tokens);
</script>

<template>
  <del :style="styles.del" class="f-del">
    <slot />
  </del>
</template>

<style>
@import '#build/untheme/del.css';
</style>
