<script setup lang="ts">
import type { GroupProps } from "../types/group";

const { tokens } = defineProps<GroupProps>();

</script>

<template>
  <div class="f-group">
    <slot />
  </div>
</template>

