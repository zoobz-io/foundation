<script lang="ts">
export interface CaptionProps {
  icon?: string;
  tokens?: Tokens<"caption">;
}
</script>

<script setup lang="ts">
const { icon, tokens } = defineProps<CaptionProps>();

const styles = useTokenStyle(tokens);
</script>

<template>
  <div :style="styles.caption" class="f-caption">
    <Icon v-if="icon" :alias="icon" />
    <slot />
  </div>
</template>

<style>
@import '#build/untheme/caption.css';
</style>
