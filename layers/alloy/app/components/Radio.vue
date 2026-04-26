<script lang="ts">
import { RadioGroupRoot, RadioGroupItem, RadioGroupIndicator } from "reka-ui";
import type { RadioProps } from "../types/radio";
</script>

<script setup lang="ts">
const {
  options,
  disabled,
  required,
  name,
  orientation = "vertical",
  pt,
} = defineProps<RadioProps>();

const model = defineModel<string>();

const el = useTemplateRef("el");
defineExpose({ el });

const rootPT = usePassthrough(pt?.root, () => ({
  props: { modelValue: model.value, disabled, required, name, orientation },
  handlers: { "update:modelValue": (v: string) => { model.value = v; } },
}));
const indicatorPT = usePassthrough(pt?.indicator, { props: {}, handlers: {} });
const optionLabelPT = usePassthrough(pt?.optionLabel, { props: {}, handlers: {} });

const optionsPT = computed(() =>
  options.map((option) => ({
    item: option,
    optionPt: passthrough(pt?.option, { props: {}, handlers: {} }),
    itemPt: passthrough(pt?.item, {
      props: { value: option.value, disabled: option.disabled },
      handlers: {},
    }),
  })),
);

const ctx = computed(() => ({ options, disabled, required, name, orientation, model: model.value }));
</script>

<template>
  <RadioGroupRoot
    ref="el"
    v-bind="rootPT.props"
    class="f-radio-root"
    v-on="rootPT.handlers"
  >
    <template v-for="entry in optionsPT" :key="entry.item.value">
      <slot name="option" v-bind="{ ...ctx, option: entry.item }">
        <Label
          v-bind="entry.optionPt.props"
          class="f-radio-option"
          v-on="entry.optionPt.handlers"
        >
          <RadioGroupItem
            v-bind="entry.itemPt.props"
            class="f-radio-item"
            v-on="entry.itemPt.handlers"
          >
            <slot name="indicator" v-bind="{ ...ctx, option: entry.item }">
              <RadioGroupIndicator v-bind="indicatorPT.props" class="f-radio-indicator" v-on="indicatorPT.handlers" />
            </slot>
          </RadioGroupItem>
          <slot name="optionLabel" v-bind="{ ...ctx, option: entry.item }">
            <Span v-bind="optionLabelPT.props" class="f-radio-label" v-on="optionLabelPT.handlers">{{ entry.item.label }}</Span>
          </slot>
        </Label>
      </slot>
    </template>
  </RadioGroupRoot>
</template>
