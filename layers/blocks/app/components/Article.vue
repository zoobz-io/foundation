<script lang="ts">
export interface ArticleProps {
  tokens?: Tokens<"article">;
}
</script>

<script setup lang="ts">
const { tokens } = defineProps<ArticleProps>();

const styles = useTokenStyle(tokens);
</script>

<template>
  <article :style="styles.article" class="f-article">
    <slot />
  </article>
</template>

<style>
@import '#build/untheme/article.css';
</style>
