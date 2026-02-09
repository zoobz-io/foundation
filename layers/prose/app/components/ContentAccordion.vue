<script lang="ts">
import type { ContentNavigationItem } from "@nuxt/content";

export interface ContentAccordionProps {
  items: ContentNavigationItem[];
  collection: string;}
</script>

<script setup lang="ts">
const { items, collection } = defineProps<ContentAccordionProps>();

// Separate items into branches (have children) and leaves (no children)
const branches = computed(() => items.filter((item) => item.children?.length));
const leaves = computed(() => items.filter((item) => !item.children?.length));

// Transform leaves to accordion items format
const accordionItems = computed(() =>
  branches.value.map((item) => ({
    value: item.path,
    label: item.title,
  })),
);

// Count all articles (leaves) recursively within a branch
const countArticles = (items: ContentNavigationItem[]): number => {
  return items.reduce((count, item) => {
    if (item.children?.length) {
      return count + countArticles(item.children);
    }
    return count + 1;
  }, 0);
};

// Get article count for a specific branch by path
const getArticleCount = (path: string): number => {
  const branch = branches.value.find((b) => b.path === path);
  return branch?.children ? countArticles(branch.children) : 0;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
</script>

<template>
  <div class="f-content-accordion">
    <!-- Render leaves as cards in a grid -->
    <div v-if="leaves.length" class="f-content-grid-root">
      <NuxtLink
        v-for="leaf in leaves"
        :key="leaf.path"
        :to="leaf.path"
        class="f-content-grid-item"
      >
        <span class="f-content-grid-title">
          {{ leaf.title }}
        </span>
        <span v-if="leaf.description" class="f-content-grid-description">
          {{ leaf.description }}
        </span>
        <div
          v-if="leaf.author || leaf.published"
          class="f-content-grid-meta"
        >
          <span v-if="leaf.author" class="f-content-grid-author">
            <Icon alias="user" />
            {{ leaf.author }}
          </span>
          <span v-if="leaf.published" class="f-content-grid-published">
            <Icon alias="calendar" />
            {{ formatDate(leaf.published as string) }}
          </span>
        </div>
      </NuxtLink>
    </div>

    <!-- Render branches as accordion -->
    <Accordion
      v-if="branches.length"
      :items="accordionItems"
      type="multiple"
          >
      <template #append="{ item }">
        <Chip>{{ getArticleCount(item.value) }}</Chip>
      </template>
      <template #content="{ item }">
        <ContentAccordion
          :items="branches.find((b) => b.path === item.value)?.children ?? []"
          :collection="collection"
                  />
      </template>
    </Accordion>
  </div>
</template>

