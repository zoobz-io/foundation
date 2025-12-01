<script lang="ts">
export interface KbdProps {
  tokens?: Tokens<"kbd">;
}
</script>

<script setup lang="ts">
const { tokens } = defineProps<KbdProps>();

const styles = useTokenStyle(tokens);
</script>

<template>
  <kbd :style="styles.kbd" class="f-kbd">
    <slot />
  </kbd>
</template>

<style>
@import '#build/untheme/kbd.css';
</style>
