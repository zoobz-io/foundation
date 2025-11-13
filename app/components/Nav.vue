<script lang="ts">
export interface NavProps {
  tokens?: Tokens<"nav">;
}
</script>

<script setup lang="ts">
const { tokens } = defineProps<NavProps>();

const styles = useTokenStyle(tokens);
</script>

<template>
  <nav :style="styles.nav" class="f-nav">
    <slot />
  </nav>
</template>
