<script lang="ts">
export interface CheckboxProps {
  disabled?: boolean;
  name?: string;
  value?: string;
  required?: boolean;
  tokens?: Tokens<"checkboxRoot" | "checkboxIndicator">;
}
</script>

<script setup lang="ts">
const { disabled, name, value, required, tokens } = defineProps<CheckboxProps>();

const model = defineModel<boolean | "indeterminate">();

const styles = useTokenStyle(tokens);
</script>

<template>
  <CheckboxRoot
    v-model="model"
    :disabled="disabled"
    :name="name"
    :value="value"
    :required="required"
    :style="styles.checkboxRoot"
    class="f-checkbox-root"
  >
    <CheckboxIndicator
      :style="styles.checkboxIndicator"
      class="f-checkbox-indicator"
    >
      <slot>
        <Icon alias="check" />
      </slot>
    </CheckboxIndicator>
  </CheckboxRoot>
</template>

<style>
@import '#build/untheme/checkbox-root.css';
@import '#build/untheme/checkbox-indicator.css';
</style>
