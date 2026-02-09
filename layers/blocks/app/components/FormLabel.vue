<script setup lang="ts">
import type { FormLabelProps } from "../types/form-label";

const { for: htmlFor } = defineProps<FormLabelProps>();

</script>

<template>
  <label :for="htmlFor" class="f-label">
    <slot />
  </label>
</template>

