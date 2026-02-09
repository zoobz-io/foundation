<script setup lang="ts">
import type { PageCollections } from "@nuxt/content";

interface CollectionConfig {
  key: string;
  title: string;
  description?: string;
  icon?: IconAlias;
}

const appConfig = useAppConfig();
const collections = computed(
  () => (appConfig.collections as CollectionConfig[]) || [],
);

// Fetch recent articles for each collection
const { data: collectionArticles } = await useAsyncData(
  "nav-collection-articles",
  async () => {
    const results: Record<string, Link[]> = {};

    for (const collection of collections.value) {
      const articles = await queryCollection(
        collection.key as keyof PageCollections,
      )
        .limit(4)
        .all();

      results[collection.key] = articles.map((article) => ({
        label: article.title,
        description: article.description,
        to: `/${collection.key}${article.path}`,
      }));
    }

    return results;
  },
);

// Build navigation items from collections
const navItems = computed<NavigatorItem[]>(() => {
  const items: NavigatorItem[] = [];

  for (const collection of collections.value) {
    const children = collectionArticles.value?.[collection.key] || [];

    if (children.length > 0) {
      items.push({
        label: collection.title,
        value: collection.key,
        icon: collection.icon,
        children,
      });
    } else {
      // No articles, just link to collection page
      items.push({
        label: collection.title,
        to: `/${collection.key}`,
        icon: collection.icon,
      });
    }
  }

  return items;
});

// Featured item for the currently hovered collection
const getFeatured = (collectionKey: string): Link | undefined => {
  const collection = collections.value.find((c) => c.key === collectionKey);
  if (!collection) return undefined;

  return {
    label: collection.title,
    description: collection.description,
    to: `/${collection.key}`,
    icon: collection.icon || "explore",
  };
};

// For now, use first collection's featured - Navigator will need enhancement for per-menu featured
const featured = computed(() => {
  const first = collections.value[0];
  return first ? getFeatured(first.key) : undefined;
});

</script>

<template>
  <Header>
    <div class="f-topbar-left">
      <slot name="logo">
        <AsciiLogo :text="appConfig.title ?? 'Docula'" />
      </slot>
      <VersionSelector />
    </div>
    <div class="f-topbar-center">
      <Search />
    </div>
    <div class="f-topbar-right">
      <slot name="actions">
        <FontMode />
        <Theme />
        <ColorMode />
      </slot>
    </div>
  </Header>
</template>
