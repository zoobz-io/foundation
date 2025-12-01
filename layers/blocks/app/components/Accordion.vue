<script lang="ts">
export interface AccordionItem {
  label: string;
  value: string;
  icon?: IconAlias;
}

export interface AccordionProps<T extends AccordionItem> {
  items: T[];
  type?: "single" | "multiple";
  collapsible?: boolean;
  defaultValue?: string | string[];
  tokens?: Tokens<
    | "accordion-root"
    | "accordion-item"
    | "accordion-header"
    | "accordion-trigger"
    | "accordion-trigger-content"
    | "accordion-content"
  >;
}
</script>

<script setup lang="ts" generic="T extends AccordionItem">
const {
  items,
  type = "single",
  collapsible = true,
  defaultValue,
  tokens,
} = defineProps<AccordionProps<T>>();

const styles = useTokenStyle(tokens);
</script>

<template>
  <AccordionRoot
    :type="type"
    :collapsible="collapsible"
    :default-value="defaultValue"
    :style="styles['accordion-root']"
    class="f-accordion-root"
  >
    <AccordionItem
      v-for="item in items"
      :key="item.value"
      :value="item.value"
      v-slot="{ open }"
      :style="styles['accordion-item']"
      class="f-accordion-item"
    >
      <AccordionHeader
        :style="styles['accordion-header']"
        class="f-accordion-header"
      >
        <AccordionTrigger
          :style="styles['accordion-trigger']"
          class="f-accordion-trigger"
          :aria-selected="open"
        >
          <slot name="trigger" :item="item" :open="open">
            <span
              :style="styles['accordion-trigger-content']"
              class="f-accordion-trigger-content"
            >
              <Icon v-if="item.icon" :alias="item.icon" />
              {{ item.label }}
            </span>
            <Icon :alias="open ? 'chevron-down' : 'chevron-right'" />
          </slot>
        </AccordionTrigger>
      </AccordionHeader>
      <AccordionContent
        :style="styles['accordion-content']"
        class="f-accordion-content"
      >
        <slot name="content" :item="item" />
      </AccordionContent>
    </AccordionItem>
  </AccordionRoot>
</template>

<style>
@import '#build/untheme/accordion-root.css';
@import '#build/untheme/accordion-item.css';
@import '#build/untheme/accordion-header.css';
@import '#build/untheme/accordion-trigger.css';
@import '#build/untheme/accordion-trigger-content.css';
@import '#build/untheme/accordion-content.css';
</style>
