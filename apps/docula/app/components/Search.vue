<script setup lang="ts">
import {
  ComboboxRoot,
  ComboboxAnchor,
  ComboboxInput,
  ComboboxPortal,
  ComboboxContent,
  ComboboxViewport,
  ComboboxItem,
  ComboboxEmpty,
} from "reka-ui";

interface SearchResult {
  path: string;
  breadcrumbs: string[];
  icon?: IconAlias;
}

const open = ref(false);
const searchQuery = ref("");

const appConfig = useAppConfig();
const collectionKey = computed(() => appConfig.collection?.key);
const navIcons = computed<Record<string, IconAlias>>(
  () => appConfig.collection?.navIcons ?? {},
);

const isMac = computed(() => {
  if (typeof navigator !== "undefined") {
    return navigator.platform.toUpperCase().includes("MAC");
  }
  return false;
});

const modKey = computed(() => (isMac.value ? "⌘" : "Ctrl"));

// Query navigation data
const { data: navigation } = await useAsyncData(
  `search-navigation-${collectionKey.value}`,
  () =>
    collectionKey.value
      ? queryCollectionNavigation(collectionKey.value)
      : Promise.resolve([]),
);

// Flatten navigation into searchable results
const allResults = computed<SearchResult[]>(() => {
  if (!navigation.value) return [];

  const results: SearchResult[] = [];

  const traverse = (
    items: typeof navigation.value,
    breadcrumbs: string[] = [],
  ) => {
    for (const item of items) {
      const currentBreadcrumbs = [...breadcrumbs, item.title];

      if (item.children && item.children.length > 0) {
        traverse(item.children, currentBreadcrumbs);
      } else {
        const sectionTitle = breadcrumbs[0];
        results.push({
          path: item.path,
          breadcrumbs: currentBreadcrumbs,
          icon: sectionTitle ? navIcons.value[sectionTitle] : undefined,
        });
      }
    }
  };

  traverse(navigation.value);
  return results;
});

// Filter results based on search query
const filteredResults = computed(() => {
  if (!searchQuery.value.trim()) return allResults.value;

  const query = searchQuery.value.toLowerCase();
  return allResults.value.filter((result) =>
    result.breadcrumbs.some((crumb) => crumb.toLowerCase().includes(query)),
  );
});

const inputRef = useTemplateRef("inputRef");

const handleFocus = () => {
  open.value = true;
};

const handleBlur = () => {
  open.value = false;
};
</script>

<template>
  <ComboboxRoot
    v-model:search-term="searchQuery"
    :open="open"
    :ignore-filter="true"
    class="f-search-root"
  >
    <ComboboxAnchor as-child>
      <ComboboxInput as-child>
        <Input
          ref="inputRef"
          placeholder="Search..."
          shortcut="meta+k"
          @focus="handleFocus"
          @blur="handleBlur"
        >
          <template #prepend>
            <Icon alias="search" />
          </template>
          <template #append>
            <Kbd>{{ modKey }} + K</Kbd>
          </template>
        </Input>
      </ComboboxInput>
    </ComboboxAnchor>
    <ComboboxPortal>
      <ComboboxContent
        position="popper"
        class="f-search-results"
        @mousedown.prevent
      >
        <ComboboxViewport>
          <ComboboxEmpty class="f-search-empty">
            {{ searchQuery ? "No results found" : "Start typing to search..." }}
          </ComboboxEmpty>

          <ComboboxItem
            v-for="result in filteredResults"
            :key="result.path"
            :value="result.path"
            class="f-search-item"
            as-child
          >
            <NuxtLink :to="result.path">
              <Icon
                v-if="result.icon"
                :alias="result.icon"
                class="f-search-icon"
              />
              <span
                class="f-search-breadcrumb"
              >
                <template v-for="(crumb, i) in result.breadcrumbs" :key="i">
                  <span
                    v-if="i > 0"
                    class="f-search-separator"
                  >
                    <Icon alias="chevron-right" />
                  </span>
                  <span>{{ crumb }}</span>
                </template>
              </span>
            </NuxtLink>
          </ComboboxItem>
        </ComboboxViewport>
      </ComboboxContent>
    </ComboboxPortal>
  </ComboboxRoot>
</template>
