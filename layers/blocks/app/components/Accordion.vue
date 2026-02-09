<script lang="ts">
export interface AccordionProps<T extends Option> {
  items: T[];
  type?: "single" | "multiple";
  collapsible?: boolean;
  defaultValue?: string | string[];}
</script>

<script setup lang="ts" generic="T extends Option">
const {
  items,
  type = "single",
  collapsible = true,
  defaultValue,
} = defineProps<AccordionProps<T>>();

</script>

<template>
  <AccordionRoot
    :type="type"
    :collapsible="collapsible"
    :default-value="defaultValue"
    class="f-accordion-root"
  >
    <AccordionItem
      v-for="item in items"
      :key="item.value"
      v-slot="{ open }"
      :value="item.value"
      class="f-accordion-item"
    >
      <AccordionHeader
        class="f-accordion-header"
      >
        <AccordionTrigger
          class="f-accordion-trigger"
          :aria-selected="open"
        >
          <slot name="trigger" :item="item" :open="open">
            <span
              class="f-accordion-trigger-content"
            >
              <slot name="prepend" :item="item" :open="open" />
              <Icon v-if="item.icon" :alias="item.icon" />
              {{ item.label }}
              <slot name="append" :item="item" :open="open" />
            </span>
            <Icon :alias="open ? 'chevron-down' : 'chevron-right'" />
          </slot>
        </AccordionTrigger>
      </AccordionHeader>
      <AccordionContent
        class="f-accordion-content"
      >
        <slot name="content" :item="item" />
      </AccordionContent>
    </AccordionItem>
  </AccordionRoot>
</template>

