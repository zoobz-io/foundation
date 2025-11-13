<script setup lang="ts">
defineProps<{
  id?: string;
}>();
</script>

<template>
  <H6 :id="id"><slot /></H6>
</template>
