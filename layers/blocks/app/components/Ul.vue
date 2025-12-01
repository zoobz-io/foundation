<script lang="ts">
export interface UlProps {
  tokens?: Tokens<"ul">;
}
</script>

<script setup lang="ts">
const { tokens } = defineProps<UlProps>();

const styles = useTokenStyle(tokens);
</script>

<template>
  <ul :style="styles.ul" class="f-ul">
    <slot />
  </ul>
</template>

<style>
@import '#build/untheme/ul.css';
</style>
