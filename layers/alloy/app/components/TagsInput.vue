<script lang="ts">
import { TagsInputRoot, TagsInputItem, TagsInputItemText, TagsInputItemDelete, TagsInputInput } from "reka-ui";
import type { AcceptableInputValue } from "reka-ui";
import type { TagsInputProps } from "../types/tags-input";
</script>

<script setup lang="ts">
const {
  placeholder = "Add tags...",
  disabled,
  required,
  name,
  max,
  addOnBlur = true,
  addOnPaste = true,
  addOnTab = true,
  delimiter = ",",
  duplicate = false,
  pt,
} = defineProps<TagsInputProps>();

const model = defineModel<string[]>();

const el = useTemplateRef("el");
defineExpose({ el });

const rootPT = usePassthrough(pt?.root, () => ({
  props: { modelValue: model.value, disabled, required, name, max, addOnBlur, addOnPaste, addOnTab, delimiter, duplicate },
  handlers: { "update:modelValue": (v: AcceptableInputValue[]) => { model.value = v.map(String); } },
}));
const itemTextPT = usePassthrough(pt?.itemText, { props: {}, handlers: {} });
const itemDeletePT = usePassthrough(pt?.itemDelete, { props: {}, handlers: {} });
const itemDeleteIconPT = usePassthrough(pt?.itemDeleteIcon, { props: { alias: "close" }, handlers: {} });
const inputPT = usePassthrough(pt?.input, {
  props: { placeholder },
  handlers: {},
});

const tagsPT = computed(() =>
  (model.value ?? []).map((tag) => ({
    item: tag,
    pt: passthrough(pt?.item, {
      props: { value: tag },
      handlers: {},
    }),
  })),
);

const ctx = computed(() => ({ placeholder, disabled, required, name, max, model: model.value }));
</script>

<template>
  <TagsInputRoot
    ref="el"
    v-bind="rootPT.props"
    class="f-tags-input-root"
    v-on="rootPT.handlers"
  >
    <template v-for="entry in tagsPT" :key="entry.item">
      <slot name="item" v-bind="{ ...ctx, tag: entry.item }">
        <TagsInputItem
          v-bind="entry.pt.props"
          class="f-tags-input-item"
          v-on="entry.pt.handlers"
        >
          <slot name="itemText" v-bind="{ ...ctx, tag: entry.item }">
            <TagsInputItemText
              v-bind="itemTextPT.props"
              class="f-tags-input-item-text"
              v-on="itemTextPT.handlers"
            />
          </slot>
          <slot name="itemDelete" v-bind="{ ...ctx, tag: entry.item }">
            <TagsInputItemDelete
              v-bind="itemDeletePT.props"
              class="f-tags-input-item-delete"
              v-on="itemDeletePT.handlers"
            >
              <slot name="itemDeleteIcon" v-bind="{ ...ctx, tag: entry.item }">
                <Icon v-bind="itemDeleteIconPT.props" v-on="itemDeleteIconPT.handlers" />
              </slot>
            </TagsInputItemDelete>
          </slot>
        </TagsInputItem>
      </slot>
    </template>
    <slot name="input" v-bind="ctx">
      <TagsInputInput
        v-bind="inputPT.props"
        class="f-tags-input-input"
        v-on="inputPT.handlers"
      />
    </slot>
  </TagsInputRoot>
</template>
