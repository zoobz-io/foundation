<script setup lang="ts">
defineProps<{
  id?: string;
}>();
</script>

<template>
  <H1 :id="id"><slot /></H1>
</template>
