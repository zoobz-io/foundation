<script lang="ts">
export interface HrProps {
  tokens?: Tokens<"hr">;
}
</script>

<script setup lang="ts">
const { tokens } = defineProps<HrProps>();

const styles = useTokenStyle(tokens);
</script>

<template>
  <hr :style="styles.hr" class="f-hr" />
</template>
