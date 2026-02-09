<script setup lang="ts">
import type { SelectProps } from "../types/select";

const {
  options,
  placeholder = "Select an option",
  disabled,
  required,
  name,
} = defineProps<SelectProps>();

const model = defineModel<string>();

</script>

<template>
  <SelectRoot
    v-model="model"
    :disabled="disabled"
    :required="required"
    :name="name"
    class="f-select-root"
  >
    <SelectTrigger
      class="f-select-trigger"
    >
      <SelectValue :placeholder="placeholder" />
      <Icon alias="chevron-down" />
    </SelectTrigger>
    <SelectContent
      class="f-select-content"
    >
      <SelectItem
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        :disabled="option.disabled"
        class="f-select-item"
      >
        {{ option.label }}
      </SelectItem>
    </SelectContent>
  </SelectRoot>
</template>

