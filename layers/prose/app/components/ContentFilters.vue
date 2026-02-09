<script setup lang="ts">

export interface ContentFiltersProps {
  collection: string;}

const { collection: _collection } = defineProps<ContentFiltersProps>();

// Placeholder data - will be dynamic later
const searchQuery = ref("");
const tags = ref<string[]>([]);
const sortBy = ref("published-desc");

const sortOptions = [
  { value: "published-desc", label: "Newest First" },
  { value: "published-asc", label: "Oldest First" },
  { value: "title-asc", label: "Title A-Z" },
  { value: "title-desc", label: "Title Z-A" },
];
</script>

<template>
  <!-- Query Header -->
  <Caption>
    <Icon alias="filter" />
    Query Content
  </Caption>

  <!-- Query Section -->
  <div
    class="f-content-filters-section"
  >
    <FormLabel for="search">Search</FormLabel>
    <Input
      id="search"
      v-model="searchQuery"
      type="search"
      placeholder="Search content..."
    />
    <FormLabel for="tags">Tags</FormLabel>
    <TagsInput
      id="tags"
      v-model="tags"
      placeholder="Add tags..."
    />
  </div>

  <!-- Sort Header -->
  <Caption>
    <Icon alias="sort" />
    Sort Content
  </Caption>

  <!-- Sort Section -->
  <div
    class="f-content-filters-section"
  >
    <FormLabel for="sort">Sort By</FormLabel>
    <Select
      id="sort"
      v-model="sortBy"
      :options="sortOptions"
    />
  </div>
</template>

