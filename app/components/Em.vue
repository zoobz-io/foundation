<script lang="ts">
export interface EmProps {
  tokens?: Tokens<"em">;
}
</script>

<script setup lang="ts">
const { tokens } = defineProps<EmProps>();

const styles = useTokenStyle(tokens);
</script>

<template>
  <em :style="styles.em" class="f-em">
    <slot />
  </em>
</template>
