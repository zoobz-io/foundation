<script setup lang="ts">
export interface AttributionProps {
  author?: string;
  published?: string;
  tags?: string[];
  tokens?: Tokens<
    | "attribution-root"
    | "attribution-container"
    | "attribution-meta"
    | "attribution-author"
    | "attribution-published"
    | "attribution-tags"
  >;
}

const { author, published, tags, tokens } = defineProps<AttributionProps>();

const styles = useTokenStyle(tokens);

const formattedDate = computed(() => {
  if (!published) return "";
  const date = new Date(published);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});
</script>

<template>
  <div
    v-if="author || published || tags?.length"
    :style="styles['attribution-root']"
    class="f-attribution-root"
  >
    <div
      :style="styles['attribution-container']"
      class="f-attribution-container"
    >
      <div :style="styles['attribution-meta']" class="f-attribution-meta">
        <template v-if="author">
          <Icon alias="user" />
          <span
            :style="styles['attribution-author']"
            class="f-attribution-author"
          >
            {{ author }}
          </span>
        </template>
        <template v-if="published">
          <Icon alias="calendar" />
          <span
            :style="styles['attribution-published']"
            class="f-attribution-published"
          >
            {{ formattedDate }}
          </span>
        </template>
      </div>
      <div
        v-if="tags?.length"
        :style="styles['attribution-tags']"
        class="f-attribution-tags"
      >
        <Chip v-for="tag in tags" :key="tag" :label="tag" />
      </div>
    </div>
  </div>
</template>

<style>
@import '#build/untheme/attribution-root.css';
@import '#build/untheme/attribution-container.css';
@import '#build/untheme/attribution-meta.css';
@import '#build/untheme/attribution-author.css';
@import '#build/untheme/attribution-published.css';
@import '#build/untheme/attribution-tags.css';
</style>
