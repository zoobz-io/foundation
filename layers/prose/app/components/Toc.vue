<script setup lang="ts">
import { useIntersectionObserver } from "@vueuse/core";

export interface TocProps {
  links: TocLink[];
  title?: string;
}

interface FlatTocLink {
  id: string;
  text: string;
  depth: number;
}

const { links, title = "On this page" } = defineProps<TocProps>();

// Flatten nested links into a single array with depth preserved
const flatLinks = computed<FlatTocLink[]>(() => {
  const flatten = (items: TocLink[]): FlatTocLink[] => {
    return items.flatMap((item) => [
      { id: item.id, text: item.text, depth: item.depth },
      ...(item.children ? flatten(item.children) : []),
    ]);
  };
  return flatten(links);
});

// Track which heading is currently active based on scroll position
const activeId = ref<string>("");
const visibleHeadings = ref<Set<string>>(new Set());

// Setup intersection observers for all headings
onMounted(() => {
  const observerOptions = {
    rootMargin: "0px 0px 0px",
    threshold: 0,
  };

  flatLinks.value.forEach((link) => {
    const element = document.getElementById(link.id);
    if (element) {
      useIntersectionObserver(
        element,
        (entries) => {
          const isIntersecting = entries[0]?.isIntersecting;
          if (isIntersecting) {
            visibleHeadings.value.add(link.id);
          } else {
            visibleHeadings.value.delete(link.id);
          }

          // Set active to the first visible heading
          if (visibleHeadings.value.size > 0) {
            const firstVisible = flatLinks.value.find((l) =>
              visibleHeadings.value.has(l.id),
            );
            if (firstVisible) {
              activeId.value = firstVisible.id;
            }
          }
        },
        observerOptions,
      );
    }
  });
});

// Calculate padding based on depth (TOC starts at h2, so depth 2 = base padding only)
const getItemStyle = (depth: number) => {
  const depthPadding = `calc(var(--ref-spacing-md) + 1rem * ${depth - 2})`;
  return {
    paddingLeft: depthPadding,
  };
};
</script>

<template>
  <nav class="f-toc-root">
    <Caption icon="toc">
      {{ title }}
    </Caption>
    <div class="f-toc-content">
      <NuxtLink
        v-for="link in flatLinks"
        :key="link.id"
        :to="`#${link.id}`"
        :aria-selected="visibleHeadings.has(link.id) ? 'true' : undefined"
        :style="getItemStyle(link.depth)"
        class="f-toc-item"
      >
        <slot name="item" :link="link">
          {{ link.text }}
        </slot>
      </NuxtLink>
    </div>
  </nav>
</template>
