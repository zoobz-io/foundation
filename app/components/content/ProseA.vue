<script setup lang="ts">
defineProps<{
  href?: string;
  target?: "_self" | "_blank";
}>();
</script>

<template>
  <A :href="href" :target="target"><slot /></A>
</template>
