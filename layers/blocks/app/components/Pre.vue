<script setup lang="ts">
import type { PreProps } from "../types/pre";

const { tokens } = defineProps<PreProps>();

</script>

<template>
  <pre class="f-pre"><slot /></pre>
</template>

