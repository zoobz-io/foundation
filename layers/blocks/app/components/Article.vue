<script setup lang="ts">
import type { ArticleProps } from "../types/article";

const { tokens } = defineProps<ArticleProps>();

</script>

<template>
  <article class="f-article">
    <slot />
  </article>
</template>

