<script lang="ts">
import { ToastRoot, ToastTitle, ToastDescription, ToastClose } from "reka-ui";
import type { ToastProps, ToastEmits } from "../types/toast";
</script>

<script setup lang="ts">
const { title, description, variant = "info", duration = 5000, pt } = defineProps<ToastProps>();

const emit = defineEmits<ToastEmits>();

const el = useTemplateRef("el");
defineExpose({ el });

const rootPT = usePassthrough(pt?.root, {
  props: { duration },
  handlers: { "update:open": (open: boolean) => { if (!open) emit("close"); } },
});
const titlePT = usePassthrough(pt?.title, {});
const descriptionPT = usePassthrough(pt?.description, {});
const closePT = usePassthrough(pt?.close, {});

const ctx = computed(() => ({ title, description, variant, duration }));
</script>

<template>
  <ToastRoot
    ref="el"
    v-bind="rootPT.props"
    :class="`f-toast f-toast-${variant}`"
    v-on="rootPT.handlers"
  >
    <slot name="title" v-bind="ctx">
      <ToastTitle v-if="title" v-bind="titlePT.props" class="f-toast-title" v-on="titlePT.handlers">
        {{ title }}
      </ToastTitle>
    </slot>
    <slot name="description" v-bind="ctx">
      <ToastDescription v-if="description || $slots.default" v-bind="descriptionPT.props" class="f-toast-description" v-on="descriptionPT.handlers">
        <slot>{{ description }}</slot>
      </ToastDescription>
    </slot>
    <slot name="close" v-bind="ctx">
      <ToastClose v-bind="closePT.props" class="f-toast-close" v-on="closePT.handlers">
        <Icon alias="close" />
      </ToastClose>
    </slot>
  </ToastRoot>
</template>
