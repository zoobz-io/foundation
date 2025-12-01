<script lang="ts">
export interface CodeProps {
  tokens?: Tokens<"code">;
}
</script>

<script setup lang="ts">
const { tokens } = defineProps<CodeProps>();

const styles = useTokenStyle(tokens);
</script>

<template>
  <code :style="styles.code" class="f-code">
    <slot />
  </code>
</template>

<style>
@import '#build/untheme/code.css';
</style>
