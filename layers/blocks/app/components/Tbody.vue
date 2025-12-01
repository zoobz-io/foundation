<script lang="ts">
export interface TbodyProps {
  tokens?: Tokens<"tbody">;
}
</script>

<script setup lang="ts">
const { tokens } = defineProps<TbodyProps>();

const styles = useTokenStyle(tokens);
</script>

<template>
  <tbody :style="styles.tbody" class="f-tbody">
    <slot />
  </tbody>
</template>

<style>
@import '#build/untheme/tbody.css';
</style>
