<script setup lang="ts">
import type { ContentNavigationItem } from "@nuxt/content";

defineProps<{
  collection: string;
  title: string;
  description?: string;
  navigation: ContentNavigationItem[];
}>();
</script>

<template>
  <Section>
    <Article>
      <H1>{{ title }}</H1>
      <P v-if="description">{{ description }}</P>
    </Article>
    <Hr
    />
    <ContentAccordion
      v-if="navigation"
      :items="navigation"
      :collection="collection"
    />
  </Section>
</template>
