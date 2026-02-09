<script setup lang="ts">
import type { CommandProps, CommandEmits } from "../types/command";

import type { AcceptableValue } from "reka-ui";
import {
  ComboboxRoot,
  ComboboxInput,
  ComboboxContent,
  ComboboxViewport,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxItem,
  ComboboxEmpty,
} from "reka-ui";

const {
  groups,
  placeholder = "Search...",
  disabled,
} = defineProps<CommandProps>();

const emit = defineEmits<CommandEmits>();

const searchTerm = defineModel<string>("searchTerm", { default: "" });

const handleSelect = (ev: AcceptableValue) => {
  const value = ev?.toString();
  if (value) {
    emit("select", value);
  }
};
</script>

<template>
  <ComboboxRoot
    v-model:search-term="searchTerm"
    :disabled="disabled"
    :open="true"
    :ignore-filter="true"
    class="f-command-root"
    @update:model-value="handleSelect"
  >
    <ComboboxInput
      :placeholder="placeholder"
      class="f-command-input"
    />
    <ComboboxContent
      class="f-command-content"
      :dismissable="false"
    >
      <ComboboxViewport
        class="f-command-viewport"
      >
        <ComboboxEmpty class="f-command-empty">
          <slot name="empty">No results found</slot>
        </ComboboxEmpty>

        <ComboboxGroup
          v-for="group in groups"
          :key="group.key"
          class="f-command-group"
        >
          <ComboboxLabel
            v-if="group.label"
            class="f-command-label"
          >
            {{ group.label }}
          </ComboboxLabel>
          <ComboboxItem
            v-for="item in group.items"
            :key="item.value"
            :value="item.value"
            :disabled="item.disabled"
            class="f-command-item"
          >
            <slot name="item" :item="item">
              {{ item.label }}
            </slot>
          </ComboboxItem>
        </ComboboxGroup>
      </ComboboxViewport>
    </ComboboxContent>
  </ComboboxRoot>
</template>

