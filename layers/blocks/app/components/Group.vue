<script lang="ts">
export interface GroupProps {
  tokens?: Tokens<"group">;
}
</script>

<script setup lang="ts">
const { tokens } = defineProps<GroupProps>();

const styles = useTokenStyle(tokens);
</script>

<template>
  <div :style="styles.group" class="f-group">
    <slot />
  </div>
</template>

<style>
@import '#build/untheme/group.css';
</style>
