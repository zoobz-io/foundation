<script lang="ts">
export interface ButtonProps {
  label?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  tokens?: Tokens<"button">;
}
</script>

<script setup lang="ts">
const { label, disabled, type = "button", tokens } = defineProps<ButtonProps>();

const styles = useTokenStyle(tokens);
</script>

<template>
  <button
    :disabled="disabled"
    :type="type"
    :style="styles.button"
    class="f-button"
  >
    <slot name="prepend" />
    <slot>
      {{ label }}
    </slot>
    <slot name="append" />
  </button>
</template>
