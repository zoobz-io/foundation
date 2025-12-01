<script lang="ts">
export interface DialogProps {
  title: string;
  description: string;
  open?: boolean;
  tokens?: Tokens<"dialog-overlay" | "dialog-content">;
}
</script>

<script setup lang="ts">
const { title, description, open, tokens } = defineProps<DialogProps>();

const emit = defineEmits<{
  "update:open": [value: boolean];
}>();

const styles = useTokenStyle(tokens);
</script>

<template>
  <DialogRoot :open="open" @update:open="emit('update:open', $event)">
    <DialogPortal>
      <DialogOverlay
        :style="styles['dialog-overlay']"
        class="f-dialog-overlay"
      />
      <DialogContent :style="styles['dialog-content']" class="f-dialog-content">
        <DialogTitle>{{ title }}</DialogTitle>
        <DialogDescription>{{ description }}</DialogDescription>
        <slot />
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<style>
@import '#build/untheme/dialog-overlay.css';
@import '#build/untheme/dialog-content.css';
</style>
