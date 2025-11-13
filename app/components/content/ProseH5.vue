<script setup lang="ts">
defineProps<{
  id?: string;
}>();
</script>

<template>
  <H5 :id="id"><slot /></H5>
</template>
