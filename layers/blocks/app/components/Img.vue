<script setup lang="ts">
import type { ImgProps } from "../types/img";

const { src, alt } = defineProps<ImgProps>();

</script>

<template>
  <img :src="src" :alt="alt" class="f-img" >
</template>

