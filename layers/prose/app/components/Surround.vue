<script lang="ts">
import type { PageCollections } from "@nuxt/content";

export interface SurroundProps<T extends keyof PageCollections> {
  collection: T;
  path?: string;
  prevLabel?: string;
  nextLabel?: string;}
</script>

<script setup lang="ts" generic="T extends keyof PageCollections">
const {
  collection,
  path,
  prevLabel = "Previous",
  nextLabel = "Next",
} = defineProps<SurroundProps<T>>();

const { prev, next } = useContentSurround(collection, path);

</script>

<template>
  <nav
    v-if="prev || next"
    class="f-surround-root"
  >
    <NuxtLink
      v-if="prev"
      :to="prev.path"
      class="f-surround-prev"
    >
      <span class="f-surround-label">
        <Icon alias="chevron-left" />
        {{ prevLabel }}
      </span>
      <span class="f-surround-title">
        {{ prev.title }}
      </span>
      <span v-if="prev.description" class="f-surround-prev-description">
        {{ prev.description }}
      </span>
    </NuxtLink>
    <NuxtLink
      v-if="next"
      :to="next.path"
      class="f-surround-next"
    >
      <span class="f-surround-label">
        {{ nextLabel }}
        <Icon alias="chevron-right" />
      </span>
      <span class="f-surround-title">
        {{ next.title }}
      </span>
      <span v-if="next.description" class="f-surround-next-description">
        {{ next.description }}
      </span>
    </NuxtLink>
  </nav>
</template>

