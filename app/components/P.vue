<script lang="ts">
export interface PProps {
  tokens?: Tokens<"p">;
}
</script>

<script setup lang="ts">
const { tokens } = defineProps<PProps>();

const styles = useTokenStyle(tokens);
</script>

<template>
  <p :style="styles.p" class="f-p">
    <slot />
  </p>
</template>
