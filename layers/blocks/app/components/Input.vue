<script setup lang="ts">
import type { InputProps } from "../types/input";

const {
  type = "text",
  placeholder,
  disabled,
  required,
  name,
  shortcut,
} = defineProps<InputProps>();

const model = defineModel<string>();

const emit = defineEmits<{
  focus: [event: FocusEvent];
  blur: [event: FocusEvent];
  keydown: [event: KeyboardEvent];
}>();

const inputRef = useTemplateRef<HTMLInputElement>("input");

if (shortcut) {
  const keys = useMagicKeys();
  const combo = computed(() => keys[shortcut]?.value);

  whenever(combo, () => {
    inputRef.value?.focus();
  });
}

const focus = () => inputRef.value?.focus();
const blur = () => inputRef.value?.blur();

defineExpose({ focus, blur });
</script>

<template>
  <div class="f-input-root" @click="focus">
    <span
      v-if="$slots.prepend"
      class="f-input-prepend"
    >
      <slot name="prepend" />
    </span>
    <input
      ref="input"
      v-model="model"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      :name="name"
      class="f-input-input"
      @focus="emit('focus', $event)"
      @blur="emit('blur', $event)"
      @keydown="emit('keydown', $event)"
    />
    <span
      v-if="$slots.append"
      class="f-input-append"
    >
      <slot name="append" />
    </span>
  </div>
</template>

<style>

.f-input-root:focus-within,
.f-input-root:focus-within:hover {
  background: var(--sys-surface);
  box-shadow: var(--ref-shadow-focus-inset);
}
.f-input-input::placeholder {
  color: var(--sys-muted);
}
</style>
