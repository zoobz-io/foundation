<script setup lang="ts">
import type { TbodyProps } from "../types/tbody";

const { tokens } = defineProps<TbodyProps>();

</script>

<template>
  <tbody class="f-tbody">
    <slot />
  </tbody>
</template>

