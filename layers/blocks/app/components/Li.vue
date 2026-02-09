<script setup lang="ts">
import type { LiProps } from "../types/li";

const { tokens } = defineProps<LiProps>();

</script>

<template>
  <li class="f-li">
    <slot />
  </li>
</template>

