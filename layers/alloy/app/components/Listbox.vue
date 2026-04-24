<script lang="ts">
import { ListboxRoot, ListboxContent, ListboxItem } from "reka-ui";
import type { ListboxProps, ListboxEmits } from "../types/listbox";
</script>

<script setup lang="ts">
const {
  items,
  modelValue,
  multiple = false,
  disabled,
  pt,
} = defineProps<ListboxProps>();

const _emit = defineEmits<ListboxEmits>();

const el = useTemplateRef("el");
defineExpose({ el });

const rootPT = usePassthrough(pt?.root, {
  props: { modelValue, multiple, disabled },
});
const contentPT = usePassthrough(pt?.content, {});

const itemsPT = computed(() =>
  items.map((item) => ({
    item,
    pt: passthrough(pt?.item, {
      props: { value: item.value, disabled: item.disabled },
    }),
  })),
);

const ctx = computed(() => ({ items, modelValue, multiple, disabled }));
</script>

<template>
  <ListboxRoot
    ref="el"
    v-bind="rootPT.props"
    class="f-listbox-root"
    v-on="rootPT.handlers"
  >
    <slot name="content" v-bind="ctx">
      <ListboxContent
        v-bind="contentPT.props"
        class="f-listbox-content"
        v-on="contentPT.handlers"
      >
        <ListboxItem
          v-for="entry in itemsPT"
          :key="entry.item.value"
          v-bind="entry.pt.props"
          class="f-listbox-item"
          v-on="entry.pt.handlers"
        >
          <slot name="item" v-bind="{ ...ctx, item: entry.item }">
            {{ entry.item.label }}
          </slot>
        </ListboxItem>
      </ListboxContent>
    </slot>
  </ListboxRoot>
</template>
