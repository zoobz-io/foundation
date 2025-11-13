<script lang="ts">
export interface MainProps {
  tokens?: Tokens<"main">;
}
</script>

<script setup lang="ts">
const { tokens } = defineProps<MainProps>();

const styles = useTokenStyle(tokens);
</script>

<template>
  <main :style="styles.main" class="f-main">
    <slot />
  </main>
</template>
