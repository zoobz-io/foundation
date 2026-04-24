<script lang="ts">
import { ToastProvider, ToastViewport } from "reka-ui";
import type { ToasterProps } from "../types/toaster";
</script>

<script setup lang="ts">
const { pt } = defineProps<ToasterProps>();

const el = useTemplateRef("el");
defineExpose({ el });

const viewportPT = usePassthrough(pt?.viewport, {});

const ctx = computed(() => ({}));
</script>

<template>
  <ToastProvider ref="el">
    <slot v-bind="ctx" />
    <slot name="viewport" v-bind="ctx">
      <ToastViewport v-bind="viewportPT.props" class="f-toast-viewport" v-on="viewportPT.handlers" />
    </slot>
  </ToastProvider>
</template>
