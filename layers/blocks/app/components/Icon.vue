<script lang="ts">
export interface IconProps {
  alias: IconAlias;
  tokens?: Tokens<"icon">;
}
</script>

<script setup lang="ts">
const { alias, tokens } = defineProps<IconProps>();

const icon = computed(() => {
  return useIconAlias(alias);
});

const styles = useTokenStyle(tokens);
</script>

<template>
  <svg
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    class="f-icon"
    :style="styles.icon"
    v-html="icon"
  />
</template>

<style>
@import '#build/untheme/icon.css';
</style>
