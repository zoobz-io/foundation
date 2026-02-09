<script setup lang="ts">
import type { BannerProps } from "../types/banner";

const { icon } = defineProps<BannerProps>();

</script>

<template>
  <div class="f-banner">
    <Icon v-if="icon" :alias="icon" />
    <slot />
  </div>
</template>

