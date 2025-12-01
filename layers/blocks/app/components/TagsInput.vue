<script lang="ts">
export interface TagsInputProps {
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  max?: number;
  addOnBlur?: boolean;
  addOnPaste?: boolean;
  addOnTab?: boolean;
  delimiter?: string;
  duplicate?: boolean;
  tokens?: Tokens<
    | "tags-input-root"
    | "tags-input-item"
    | "tags-input-item-text"
    | "tags-input-item-delete"
    | "tags-input-input"
    | "tags-input-clear"
  >;
}
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
  tokens,
} = defineProps<TagsInputProps>();

const model = defineModel<string[]>();

const styles = useTokenStyle(tokens);
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
    :style="styles['tags-input-root']"
    class="f-tags-input-root"
  >
    <TagsInputItem
      v-for="item in model"
      :key="item"
      :value="item"
      :style="styles['tags-input-item']"
      class="f-tags-input-item"
    >
      <TagsInputItemText
        :style="styles['tags-input-item-text']"
        class="f-tags-input-item-text"
      />
      <TagsInputItemDelete
        :style="styles['tags-input-item-delete']"
        class="f-tags-input-item-delete"
      >
        <Icon alias="close" />
      </TagsInputItemDelete>
    </TagsInputItem>
    <TagsInputInput
      :placeholder="placeholder"
      :style="styles['tags-input-input']"
      class="f-tags-input-input"
    />
  </TagsInputRoot>
</template>

<style>
@import '#build/untheme/tags-input-root.css';
@import '#build/untheme/tags-input-item.css';
@import '#build/untheme/tags-input-item-text.css';
@import '#build/untheme/tags-input-item-delete.css';
@import '#build/untheme/tags-input-input.css';
</style>
