<script setup lang="ts">
defineProps<{
  id?: string;
}>();
</script>

<template>
  <H4 :id="id"><slot /></H4>
</template>
