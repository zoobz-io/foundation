<script lang="ts">
export interface H4Props {
  tokens?: Tokens<"h4">;
}
</script>

<script setup lang="ts">
const { tokens } = defineProps<H4Props>();

const styles = useTokenStyle(tokens);
</script>

<template>
  <h4 :style="styles.h4" class="f-h4">
    <slot />
  </h4>
</template>
