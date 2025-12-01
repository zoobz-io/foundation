<script lang="ts">
export interface InputProps {
  type?: "text" | "email" | "password" | "search" | "url" | "tel" | "number";
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  tokens?: Tokens<"input">;
}
</script>

<script setup lang="ts">
const {
  type = "text",
  placeholder,
  disabled,
  required,
  name,
  tokens,
} = defineProps<InputProps>();

const model = defineModel<string>();

const styles = useTokenStyle(tokens);
</script>

<template>
  <input
    v-model="model"
    :type="type"
    :placeholder="placeholder"
    :disabled="disabled"
    :required="required"
    :name="name"
    :style="styles.input"
    class="f-input"
  />
</template>

<style>
@import '#build/untheme/input.css';
</style>
