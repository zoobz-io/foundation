<script lang="ts">
export interface ListboxItem {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface ListboxProps {
  items: ListboxItem[];
  modelValue?: string | string[];
  multiple?: boolean;
  disabled?: boolean;
  tokens?: Tokens<"listbox-root" | "listbox-content" | "listbox-item">;
}
</script>

<script setup lang="ts">
const {
  items,
  modelValue,
  multiple = false,
  disabled,
  tokens,
} = defineProps<ListboxProps>();

const emit = defineEmits<{
  "update:modelValue": [string | string[]];
}>();

const styles = useTokenStyle(tokens);

const handleUpdate = (value: string | string[]) => {
  emit("update:modelValue", value);
};
</script>

<template>
  <ListboxRoot
    :model-value="modelValue"
    :multiple="multiple"
    :disabled="disabled"
    :style="styles['listbox-root']"
    class="f-listbox-root"
  >
    <ListboxContent
      :style="styles['listbox-content']"
      class="f-listbox-content"
    >
      <ListboxItem
        v-for="item in items"
        :key="item.value"
        :value="item.value"
        :disabled="item.disabled"
        :style="styles['listbox-item']"
        class="f-listbox-item"
      >
        <slot name="item" :item="item">
          {{ item.label }}
        </slot>
      </ListboxItem>
    </ListboxContent>
  </ListboxRoot>
</template>
