<script lang="ts">
import { AccordionRoot, AccordionItem, AccordionHeader, AccordionTrigger, AccordionContent } from "reka-ui";
import type { AccordionProps } from "../types/accordion";
</script>

<script setup lang="ts">
const {
  items,
  type = "single",
  collapsible = true,
  defaultValue,
  pt,
} = defineProps<AccordionProps>();

const el = useTemplateRef("el");
defineExpose({ el });

const rootPT = usePassthrough(pt?.root, {
  props: { type, collapsible, defaultValue },
});
const headerPT = usePassthrough(pt?.header, {});
const triggerPT = usePassthrough(pt?.trigger, {});
const contentPT = usePassthrough(pt?.content, {});

const itemsPT = computed(() =>
  items.map((item) => ({
    item,
    pt: passthrough(pt?.item, {
      props: { value: item.value },
    }),
  })),
);

const ctx = computed(() => ({ items, type, collapsible, defaultValue }));
</script>

<template>
  <AccordionRoot
    ref="el"
    v-bind="rootPT.props"
    class="f-accordion-root"
    v-on="rootPT.handlers"
  >
    <AccordionItem
      v-for="entry in itemsPT"
      :key="entry.item.value"
      v-slot="{ open }"
      v-bind="entry.pt.props"
      class="f-accordion-item"
      v-on="entry.pt.handlers"
    >
      <slot name="item" v-bind="{ ...ctx, item: entry.item, open }">
        <AccordionHeader
          v-bind="headerPT.props"
          class="f-accordion-header"
          v-on="headerPT.handlers"
        >
          <slot name="header" v-bind="{ ...ctx, item: entry.item, open }">
            <AccordionTrigger
              v-bind="triggerPT.props"
              class="f-accordion-trigger"
              :aria-selected="open"
              v-on="triggerPT.handlers"
            >
              <slot name="trigger" v-bind="{ ...ctx, item: entry.item, open }">
                <Group class="f-accordion-trigger-content">
                  <Icon v-if="entry.item.icon" :alias="entry.item.icon" />
                  {{ entry.item.label }}
                </Group>
                <Icon :alias="open ? 'chevron-down' : 'chevron-right'" />
              </slot>
            </AccordionTrigger>
          </slot>
        </AccordionHeader>
        <AccordionContent
          v-bind="contentPT.props"
          class="f-accordion-content"
          v-on="contentPT.handlers"
        >
          <slot name="content" v-bind="{ ...ctx, item: entry.item, open }" />
        </AccordionContent>
      </slot>
    </AccordionItem>
  </AccordionRoot>
</template>
