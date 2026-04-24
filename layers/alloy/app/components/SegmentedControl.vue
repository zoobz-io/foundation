<script lang="ts">
import type { SegmentedControlProps } from "../types/segmented-control";
import type { AcceptableValue } from "reka-ui";
import {
  ToggleGroupRoot,
  ToggleGroupItem,
} from "reka-ui";
</script>

<script setup lang="ts">
const {
  pt,
  options,
  disabled,
  required,
} = defineProps<SegmentedControlProps>();

const model = defineModel<string>();

const el = useTemplateRef("el");
defineExpose({ el });

// Prevent deselection when required
const handleUpdate = (value: AcceptableValue | AcceptableValue[]) => {
  const val = Array.isArray(value) ? value[0] : value;
  if (required && !val) return;
  if (typeof val === "string") model.value = val;
};

const rootPT = usePassthrough(pt?.root, {
  props: { modelValue: model.value, type: "single", disabled },
  handlers: { "update:modelValue": handleUpdate },
});

const itemsPT = computed(() =>
  options.map((option) => ({
    item: option,
    pt: passthrough(pt?.item, {
      props: { value: option.value, disabled: option.disabled },
    }),
  })),
);

const ctx = computed(() => ({
  options,
  disabled,
  required,
  model: model.value,
}));
</script>

<template>
  <ToggleGroupRoot
    ref="el"
    v-bind="rootPT.props"
    class="f-segmented-control"
    v-on="rootPT.handlers"
  >
    <slot v-for="entry in itemsPT" name="item" v-bind="{ ...ctx, option: entry.item }">
      <ToggleGroupItem
        :key="entry.item.value"
        v-bind="entry.pt.props"
        class="f-segmented-control-item"
        v-on="entry.pt.handlers"
      >
        <Icon v-if="entry.item.icon" :alias="entry.item.icon" />
        <Span v-if="entry.item.label">{{ entry.item.label }}</Span>
      </ToggleGroupItem>
    </slot>
  </ToggleGroupRoot>
</template>
