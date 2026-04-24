<script lang="ts">
import { TagsInputRoot, TagsInputItem, TagsInputItemText, TagsInputItemDelete, TagsInputInput } from "reka-ui";
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

const rootPT = usePassthrough(pt?.root, {
  props: { disabled, required, name, max, addOnBlur, addOnPaste, addOnTab, delimiter, duplicate },
});
const itemTextPT = usePassthrough(pt?.itemText, {});
const itemDeletePT = usePassthrough(pt?.itemDelete, {});
const inputPT = usePassthrough(pt?.input, {
  props: { placeholder },
});

const tagsPT = computed(() =>
  (model.value ?? []).map((tag) => ({
    item: tag,
    pt: passthrough(pt?.item, {
      props: { value: tag },
    }),
  })),
);

const ctx = computed(() => ({ placeholder, disabled, required, name, max, model: model.value }));
</script>

<template>
  <TagsInputRoot
    ref="el"
    v-model="model"
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
          <TagsInputItemText
            v-bind="itemTextPT.props"
            class="f-tags-input-item-text"
            v-on="itemTextPT.handlers"
          />
          <TagsInputItemDelete
            v-bind="itemDeletePT.props"
            class="f-tags-input-item-delete"
            v-on="itemDeletePT.handlers"
          >
            <Icon alias="close" />
          </TagsInputItemDelete>
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
