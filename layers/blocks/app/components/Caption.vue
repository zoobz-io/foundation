<script setup lang="ts">
import type { CaptionProps } from "../types/caption";

const { icon } = defineProps<CaptionProps>();

</script>

<template>
  <div class="f-caption">
    <Icon v-if="icon" :alias="icon" />
    <slot />
  </div>
</template>

