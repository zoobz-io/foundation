<script setup lang="ts">
defineProps<{
  code?: string;
  language?: string;
  inline?: boolean;
}>();
</script>

<template>
  <Code><slot /></Code>
</template>
