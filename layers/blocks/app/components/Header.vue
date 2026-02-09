<script setup lang="ts">
import type { HeaderProps } from "../types/header";

const { tokens } = defineProps<HeaderProps>();

</script>

<template>
  <header class="f-header">
    <slot />
  </header>
</template>

