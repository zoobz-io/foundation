<script setup lang="ts">
import type { AsideProps } from "../types/aside";

const { tokens } = defineProps<AsideProps>();

</script>

<template>
  <aside class="f-aside">
    <slot />
  </aside>
</template>

