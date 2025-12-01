<script lang="ts">
export interface ImgProps {
  src: string;
  alt?: string;
  tokens?: Tokens<"img">;
}
</script>

<script setup lang="ts">
const { src, alt, tokens } = defineProps<ImgProps>();

const styles = useTokenStyle(tokens);
</script>

<template>
  <img :src="src" :alt="alt" :style="styles.img" class="f-img" />
</template>

<style>
@import '#build/untheme/img.css';
</style>
