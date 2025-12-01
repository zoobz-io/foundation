<script lang="ts">
export interface LiProps {
  tokens?: Tokens<"li">;
}
</script>

<script setup lang="ts">
const { tokens } = defineProps<LiProps>();

const styles = useTokenStyle(tokens);
</script>

<template>
  <li :style="styles.li" class="f-li">
    <slot />
  </li>
</template>

<style>
@import '#build/untheme/li.css';
</style>
