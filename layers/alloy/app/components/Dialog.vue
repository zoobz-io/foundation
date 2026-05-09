<script lang="ts">
import { DialogRoot, DialogPortal, DialogOverlay, DialogContent, DialogTitle, DialogDescription } from "reka-ui";
import type { DialogProps, DialogEmits } from "../types/dialog";
</script>

<script setup lang="ts">
const { title, description, open, pt } = defineProps<DialogProps>();

const emit = defineEmits<DialogEmits>();

const el = useTemplateRef("el");
defineExpose({ el });

const rootPT = usePassthrough(pt?.root, () => ({
  props: { open },
  handlers: { "update:open": (v: boolean) => emit("update:open", v) },
}));
const overlayPT = usePassthrough(pt?.overlay, { props: {}, handlers: {} });
const contentPT = usePassthrough(pt?.content, { props: {}, handlers: {} });
const titlePT = usePassthrough(pt?.title, { props: {}, handlers: {} });
const descriptionPT = usePassthrough(pt?.description, { props: {}, handlers: {} });

const ctx = computed(() => ({ title, description, open }));
</script>

<template>
  <DialogRoot ref="el" v-bind="rootPT.props" v-on="rootPT.handlers">
    <DialogPortal>
      <slot name="overlay" v-bind="ctx">
        <DialogOverlay
          v-bind="overlayPT.props"
          class="f-dialog-overlay"
          v-on="overlayPT.handlers"
        />
      </slot>
      <slot name="content" v-bind="ctx">
        <DialogContent
          v-bind="contentPT.props"
          class="f-dialog-content"
          v-on="contentPT.handlers"
        >
          <slot name="title" v-bind="ctx">
            <DialogTitle
              v-bind="titlePT.props"
              class="f-dialog-title"
              v-on="titlePT.handlers"
            >
              {{ title }}
            </DialogTitle>
          </slot>
          <slot name="description" v-bind="ctx">
            <DialogDescription
              v-bind="descriptionPT.props"
              class="f-dialog-description"
              v-on="descriptionPT.handlers"
            >
              {{ description }}
            </DialogDescription>
          </slot>
          <slot v-bind="ctx" />
        </DialogContent>
      </slot>
    </DialogPortal>
  </DialogRoot>
</template>
