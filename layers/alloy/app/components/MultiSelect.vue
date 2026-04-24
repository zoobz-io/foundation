<script lang="ts">
import type { MultiSelectProps } from "../types/multi-select";
</script>

<script setup lang="ts">
const {
  pt,
  items,
  placeholder = "Select options",
  disabled,
} = defineProps<MultiSelectProps>();

const model = defineModel<string[]>({ default: () => [] });

const el = useTemplateRef("el");
defineExpose({ el });

const open = ref(false);

const displayText = computed(() => {
  if (!model.value.length) return placeholder;
  if (model.value.length === 1) {
    const item = items.find((i) => i.value === model.value[0]);
    return item?.label ?? model.value[0];
  }
  return `${model.value.length} selected`;
});

const isSelected = (value: string) => model.value.includes(value);

const toggle = (value: string) => {
  if (isSelected(value)) {
    model.value = model.value.filter((v) => v !== value);
  } else {
    model.value = [...model.value, value];
  }
};

const triggerPT = usePassthrough(pt?.trigger, {
  props: { disabled },
});
const contentPT = usePassthrough(pt?.content, {});

const itemsPT = computed(() =>
  items.map((item) => ({
    item,
    pt: passthrough(pt?.item, {
      props: { disabled: item.disabled },
      handlers: { click: () => toggle(item.value) },
    }),
  })),
);

const ctx = computed(() => ({
  items,
  placeholder,
  disabled,
  model: model.value,
  open: open.value,
  displayText: displayText.value,
  isSelected,
}));
</script>

<template>
  <Popover ref="el" v-model:open="open" :disabled="disabled">
    <slot name="trigger" v-bind="ctx">
      <Button
        v-bind="triggerPT.props"
        class="f-multiselect-trigger"
        v-on="triggerPT.handlers"
      >
        <Span>{{ displayText }}</Span>
        <Icon alias="chevron-down" />
      </Button>
    </slot>
    <template #content>
      <Group v-bind="contentPT.props" class="f-multiselect-content" v-on="contentPT.handlers">
        <template v-for="entry in itemsPT" :key="entry.item.value">
          <slot name="item" v-bind="{ ...ctx, item: entry.item, selected: isSelected(entry.item.value) }">
            <Button
              v-bind="entry.pt.props"
              class="f-multiselect-item"
              v-on="entry.pt.handlers"
            >
              <Checkbox
                :model-value="isSelected(entry.item.value)"
                :disabled="entry.item.disabled"
                tabindex="-1"
              />
              <Span>{{ entry.item.label }}</Span>
            </Button>
          </slot>
        </template>
      </Group>
    </template>
  </Popover>
</template>
