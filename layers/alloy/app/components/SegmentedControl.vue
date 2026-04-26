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

const rootPT = usePassthrough(pt?.root, () => ({
  props: { modelValue: model.value, type: "single" as const, disabled },
  handlers: { "update:modelValue": handleUpdate },
}));

const itemLabelPT = usePassthrough(pt?.itemLabel, { props: {}, handlers: {} });

const itemsPT = computed(() =>
  options.map((option) => ({
    item: option,
    pt: passthrough(pt?.item, {
      props: { value: option.value, disabled: option.disabled },
      handlers: {},
    }),
    iconPT: option.icon
      ? passthrough(pt?.itemIcon, { props: { alias: option.icon }, handlers: {} })
      : null,
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
        <slot name="itemIcon" v-bind="{ ...ctx, option: entry.item }">
          <Icon v-if="entry.iconPT" v-bind="entry.iconPT.props" v-on="entry.iconPT.handlers" />
        </slot>
        <slot name="itemLabel" v-bind="{ ...ctx, option: entry.item }">
          <Span v-if="entry.item.label" v-bind="itemLabelPT.props" v-on="itemLabelPT.handlers">{{ entry.item.label }}</Span>
        </slot>
      </ToggleGroupItem>
    </slot>
  </ToggleGroupRoot>
</template>
