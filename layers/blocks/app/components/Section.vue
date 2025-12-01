<script lang="ts">
export interface SectionProps {
  tokens?: Tokens<"section">;
}
</script>

<script setup lang="ts">
const { tokens } = defineProps<SectionProps>();

const styles = useTokenStyle(tokens);
</script>

<template>
  <section :style="styles.section" class="f-section">
    <slot />
  </section>
</template>

<style>
@import '#build/untheme/section.css';
</style>
