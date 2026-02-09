<script lang="ts">
import type { CollectionConfig, SearchResult, GroupedResults } from "../composables/search";
import type { CommandGroup } from "@foundation/blocks/app/components/Command.vue";

export interface ContentSearchProps {
  collections: CollectionConfig[];}
</script>

<script setup lang="ts">
const { collections } = defineProps<ContentSearchProps>();

const emit = defineEmits<{
  select: [id: string];
}>();

const { query, groupedResults, isSearching } = useContentSearch(collections);

const commandRef = ref<{ focus: () => void; clear: () => void }>();

// Deduplicate results within each group by page path
const deduplicatedGroups = computed<GroupedResults[]>(() => {
  return groupedResults.value.map((group) => {
    const pageMap = new Map<string, SearchResult>();

    for (const result of group.results) {
      const pagePath = result.id.split("#")[0];
      if (!pageMap.has(pagePath)) {
        pageMap.set(pagePath, result);
      }
    }

    return {
      ...group,
      results: Array.from(pageMap.values()),
    };
  });
});

// Build a lookup map from value to result for navigation
const resultMap = computed(() => {
  const map = new Map<string, SearchResult & { basePath: string }>();
  for (const group of deduplicatedGroups.value) {
    for (const result of group.results) {
      const value = `${group.collection}::${result.id}`;
      map.set(value, result);
    }
  }
  return map;
});

// Transform groups into Command format
const commandGroups = computed<CommandGroup[]>(() => {
  return deduplicatedGroups.value
    .filter((group) => group.results.length > 0)
    .map((group) => ({
      key: group.collection,
      label: group.title,
      items: group.results.map((result) => ({
        value: `${group.collection}::${result.id}`,
        label: result.titles.join(" > ") || result.title,
      })),
    }));
});

const handleSelect = (value: string) => {
  const result = resultMap.value.get(value);
  if (result) {
    const path = result.basePath ? `${result.basePath}/${result.id}` : result.id;
    emit("select", path);
  }
};

// Get result data for rendering in slot
const getResult = (value: string) => {
  return resultMap.value.get(value);
};

// Format date for display
const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const focus = () => {
  commandRef.value?.focus();
};

const clear = () => {
  query.value = "";
};

defineExpose({ focus, clear });
</script>

<template>
  <Command
    ref="commandRef"
    v-model:search-term="query"
    :groups="commandGroups"
    placeholder="Search documentation..."
    @select="handleSelect"
  >
    <template #empty>
      <span v-if="query && !isSearching">No results found</span>
      <span v-else-if="!query">Start typing to search...</span>
    </template>

    <template #item="{ item }">
      <template v-if="getResult(item.value)">
        <Icon
          v-if="getResult(item.value)?.icon"
          :alias="getResult(item.value)!.icon!"
                  />
        <template v-if="getResult(item.value)!.titles.length > 0">
          <template
            v-for="(title, index) in getResult(item.value)!.titles"
            :key="index"
          >
            <span
              v-if="index > 0"
              class="f-content-search-result-separator"
            >
              <Icon alias="chevron-right" />
            </span>
            <span
              class="f-content-search-result-title"
            >
              {{ title }}
            </span>
          </template>
        </template>
        <span
          v-else
          class="f-content-search-result-title"
        >
          {{ getResult(item.value)!.title }}
        </span>
        <span
          v-if="getResult(item.value)?.published"
          class="f-content-search-result-date"
        >
          {{ formatDate(getResult(item.value)!.published!) }}
        </span>
      </template>
    </template>
  </Command>
</template>

