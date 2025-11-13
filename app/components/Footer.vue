<script lang="ts">
export interface FooterProps {
  tokens?: Tokens<"footer">;
}
</script>

<script setup lang="ts">
const { tokens } = defineProps<FooterProps>();

const styles = useTokenStyle(tokens);
</script>

<template>
  <footer :style="styles.footer" class="f-footer">
    <slot />
  </footer>
</template>
