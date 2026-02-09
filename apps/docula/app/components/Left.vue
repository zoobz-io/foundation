<script setup lang="ts">
defineProps<{
  border?: boolean;
}>();
</script>

<template>
  <Nav
  >
    <Aside>
      <slot />
    </Aside>
  </Nav>
</template>
