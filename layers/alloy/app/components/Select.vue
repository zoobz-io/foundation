<script lang="ts">
import { SelectRoot, SelectTrigger, SelectPortal, SelectContent, SelectItem, SelectItemText } from "reka-ui";
import type { AcceptableValue } from "reka-ui";
import type { SelectProps } from "../types/select";
</script>

<script setup lang="ts">
const {
  options,
  placeholder = "Select an option",
  disabled,
  required,
  name,
  pt,
} = defineProps<SelectProps>();

const model = defineModel<string>();

const el = useTemplateRef("el");
defineExpose({ el });

const displayText = computed(() => {
  const selected = options.find((o) => o.value === model.value);
  return selected?.label ?? placeholder;
});

const rootPT = usePassthrough(pt?.root, () => ({
  props: { modelValue: model.value, disabled, required, name },
  handlers: { "update:modelValue": (v: AcceptableValue) => { model.value = String(v); } },
}));
const triggerPT = usePassthrough(pt?.trigger, { props: {}, handlers: {} });
const contentPT = usePassthrough(pt?.content, {
  props: { position: "popper", sideOffset: 4 },
  handlers: {},
});
const triggerLabelPT = usePassthrough(pt?.triggerLabel, { props: {}, handlers: {} });
const triggerIconPT = usePassthrough(pt?.triggerIcon, { props: { alias: "chevron-down" }, handlers: {} });
const itemTextPT = usePassthrough(pt?.itemText, { props: {}, handlers: {} });

const itemsPT = computed(() =>
  options.map((option) => ({
    item: option,
    pt: passthrough(pt?.item, {
      props: { value: option.value, disabled: option.disabled },
      handlers: {},
    }),
  })),
);

const ctx = computed(() => ({ options, placeholder, disabled, required, name, model: model.value, displayText: displayText.value }));
</script>

<template>
  <SelectRoot
    ref="el"
    v-bind="rootPT.props"
    class="f-select-root"
    v-on="rootPT.handlers"
  >
    <slot name="trigger" v-bind="ctx">
      <SelectTrigger
        v-bind="triggerPT.props"
        class="f-select-trigger"
        v-on="triggerPT.handlers"
      >
        <slot name="triggerLabel" v-bind="ctx">
          <Span v-bind="triggerLabelPT.props" v-on="triggerLabelPT.handlers">{{ displayText }}</Span>
        </slot>
        <slot name="triggerIcon" v-bind="ctx">
          <Icon v-bind="triggerIconPT.props" v-on="triggerIconPT.handlers" />
        </slot>
      </SelectTrigger>
    </slot>
    <SelectPortal>
      <slot name="content" v-bind="ctx">
        <SelectContent
          v-bind="contentPT.props"
          class="f-select-content"
          v-on="contentPT.handlers"
        >
          <template v-for="entry in itemsPT" :key="entry.item.value">
            <slot name="item" v-bind="{ ...ctx, option: entry.item }">
              <SelectItem
                v-bind="entry.pt.props"
                class="f-select-item"
                v-on="entry.pt.handlers"
              >
                <slot name="itemText" v-bind="{ ...ctx, option: entry.item }">
                  <SelectItemText v-bind="itemTextPT.props" v-on="itemTextPT.handlers">{{ entry.item.label }}</SelectItemText>
                </slot>
              </SelectItem>
            </slot>
          </template>
        </SelectContent>
      </slot>
    </SelectPortal>
  </SelectRoot>
</template>
