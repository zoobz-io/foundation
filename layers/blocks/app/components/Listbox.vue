<script setup lang="ts">
import type { ListboxProps, ListboxEmits } from "../types/listbox";

const {
  items,
  modelValue,
  multiple = false,
  disabled,
} = defineProps<ListboxProps>();

const emit = defineEmits<ListboxEmits>();

const _handleUpdate = (value: string | string[]) => {
  emit("update:modelValue", value);
};
</script>

<template>
  <ListboxRoot
    :model-value="modelValue"
    :multiple="multiple"
    :disabled="disabled"
    class="f-listbox-root"
  >
    <ListboxContent
      class="f-listbox-content"
    >
      <ListboxItem
        v-for="item in items"
        :key="item.value"
        :value="item.value"
        :disabled="item.disabled"
        class="f-listbox-item"
      >
        <slot name="item" :item="item">
          {{ item.label }}
        </slot>
      </ListboxItem>
    </ListboxContent>
  </ListboxRoot>
</template>

