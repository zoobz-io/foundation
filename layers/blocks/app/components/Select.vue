<script lang="ts">
export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  tokens?: Tokens<
    | "select-root"
    | "select-trigger"
    | "select-content"
    | "select-item"
  >;
}
</script>

<script setup lang="ts">
const {
  options,
  placeholder = "Select an option",
  disabled,
  required,
  name,
  tokens,
} = defineProps<SelectProps>();

const model = defineModel<string>();

const styles = useTokenStyle(tokens);
</script>

<template>
  <SelectRoot
    v-model="model"
    :disabled="disabled"
    :required="required"
    :name="name"
    :style="styles['select-root']"
    class="f-select-root"
  >
    <SelectTrigger
      :style="styles['select-trigger']"
      class="f-select-trigger"
    >
      <SelectValue :placeholder="placeholder" />
      <Icon alias="chevron-down" />
    </SelectTrigger>
    <SelectContent
      :style="styles['select-content']"
      class="f-select-content"
    >
      <SelectItem
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        :disabled="option.disabled"
        :style="styles['select-item']"
        class="f-select-item"
      >
        {{ option.label }}
      </SelectItem>
    </SelectContent>
  </SelectRoot>
</template>

<style>
@import '#build/untheme/select-root.css';
@import '#build/untheme/select-trigger.css';
@import '#build/untheme/select-content.css';
@import '#build/untheme/select-item.css';
</style>
