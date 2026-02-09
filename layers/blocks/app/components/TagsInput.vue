<script setup lang="ts">
import type { TagsInputProps } from "../types/tags-input";

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
} = defineProps<TagsInputProps>();

const model = defineModel<string[]>();

</script>

<template>
  <TagsInputRoot
    v-model="model"
    :disabled="disabled"
    :required="required"
    :name="name"
    :max="max"
    :add-on-blur="addOnBlur"
    :add-on-paste="addOnPaste"
    :add-on-tab="addOnTab"
    :delimiter="delimiter"
    :duplicate="duplicate"
    class="f-tags-input-root"
  >
    <TagsInputItem
      v-for="item in model"
      :key="item"
      :value="item"
      class="f-tags-input-item"
    >
      <TagsInputItemText
        class="f-tags-input-item-text"
      />
      <TagsInputItemDelete
        class="f-tags-input-item-delete"
      >
        <Icon alias="close" />
      </TagsInputItemDelete>
    </TagsInputItem>
    <TagsInputInput
      :placeholder="placeholder"
      class="f-tags-input-input"
    />
  </TagsInputRoot>
</template>

