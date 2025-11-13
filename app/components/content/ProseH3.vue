<script setup lang="ts">
defineProps<{
  id?: string;
}>();
</script>

<template>
  <H3 :id="id"><slot /></H3>
</template>
