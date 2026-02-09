<script setup lang="ts">
import type { DialogProps, DialogEmits } from "../types/dialog";

const { title, description, open } = defineProps<DialogProps>();

const emit = defineEmits<DialogEmits>();

</script>

<template>
  <DialogRoot :open="open" @update:open="emit('update:open', $event)">
    <DialogPortal>
      <DialogOverlay
        class="f-dialog-overlay"
      />
      <DialogContent class="f-dialog-content">
        <DialogTitle
          class="f-dialog-title"
        >
          {{ title }}
        </DialogTitle>
        <DialogDescription
          class="f-dialog-description"
        >
          {{ description }}
        </DialogDescription>
        <slot />
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

