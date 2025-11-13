<script lang="ts">
export interface OlProps {
  tokens?: Tokens<"ol">;
}
</script>

<script setup lang="ts">
const { tokens } = defineProps<OlProps>();

const styles = useTokenStyle(tokens);
</script>

<template>
  <ol :style="styles.ol" class="f-ol">
    <slot />
  </ol>
</template>
