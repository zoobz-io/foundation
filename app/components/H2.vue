<script lang="ts">
export interface H2Props {
  tokens?: Tokens<"h2">;
}
</script>

<script setup lang="ts">
const { tokens } = defineProps<H2Props>();

const styles = useTokenStyle(tokens);
</script>

<template>
  <h2 :style="styles.h2" class="f-h2">
    <slot />
  </h2>
</template>
