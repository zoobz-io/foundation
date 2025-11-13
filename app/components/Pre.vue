<script lang="ts">
export interface PreProps {
  tokens?: Tokens<"pre">;
}
</script>

<script setup lang="ts">
const { tokens } = defineProps<PreProps>();

const styles = useTokenStyle(tokens);
</script>

<template>
  <pre :style="styles.pre" class="f-pre"><slot /></pre>
</template>
