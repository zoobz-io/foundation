<script lang="ts">
import { TabsRoot, TabsList, TabsTrigger, TabsContent } from "reka-ui";
import type { TabsProps } from "../types/tabs";
</script>

<script setup lang="ts">
const { tabs: tabItems, pt } = defineProps<TabsProps>();

const model = defineModel<string>();

const el = useTemplateRef("el");
defineExpose({ el });

const rootPT = usePassthrough(pt?.root, {});
const listPT = usePassthrough(pt?.list, {});

const triggersPT = computed(() =>
  tabItems.map((tab) => ({
    item: tab,
    pt: passthrough(pt?.trigger, {
      props: { value: tab.value, disabled: tab.disabled },
    }),
  })),
);

const contentsPT = computed(() =>
  tabItems.map((tab) => ({
    item: tab,
    pt: passthrough(pt?.content, {
      props: { value: tab.value },
    }),
  })),
);

const ctx = computed(() => ({ tabs: tabItems, model }));
</script>

<template>
  <TabsRoot ref="el" v-model="model" v-bind="rootPT.props" class="f-tabs-root" v-on="rootPT.handlers">
    <slot name="list" v-bind="ctx">
      <TabsList v-bind="listPT.props" class="f-tabs-list" v-on="listPT.handlers">
        <TabsTrigger
          v-for="entry in triggersPT"
          :key="entry.item.value"
          v-bind="entry.pt.props"
          class="f-tabs-trigger"
          v-on="entry.pt.handlers"
        >
          <slot name="trigger" v-bind="{ ...ctx, tab: entry.item }">
            <Icon v-if="entry.item.icon" :alias="entry.item.icon" />
            {{ entry.item.label }}
          </slot>
        </TabsTrigger>
      </TabsList>
    </slot>

    <TabsContent
      v-for="entry in contentsPT"
      :key="entry.item.value"
      v-bind="entry.pt.props"
      class="f-tabs-content"
      v-on="entry.pt.handlers"
    >
      <slot :name="entry.item.value" v-bind="{ ...ctx, tab: entry.item }" />
    </TabsContent>
  </TabsRoot>
</template>
