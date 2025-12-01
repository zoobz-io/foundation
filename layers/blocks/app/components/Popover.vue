<script lang="ts">
export interface PopoverProps {
  open?: boolean;
  defaultOpen?: boolean;
  modal?: boolean;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  sideOffset?: number;
  alignOffset?: number;
  arrow?: boolean;
  tokens?: Tokens<
    "popover-trigger" | "popover-content" | "popover-arrow" | "popover-close"
  >;
}
</script>

<script setup lang="ts">
const {
  open,
  defaultOpen = false,
  modal = false,
  side = "bottom",
  align = "center",
  sideOffset = 10,
  alignOffset = 0,
  arrow = false,
  tokens,
} = defineProps<PopoverProps>();

const emit = defineEmits<{
  "update:open": [value: boolean];
}>();

const styles = useTokenStyle(tokens);
</script>

<template>
  <PopoverRoot
    :open="open"
    :default-open="defaultOpen"
    :modal="modal"
    @update:open="emit('update:open', $event)"
  >
    <PopoverTrigger
      as-child
      :style="styles['popover-trigger']"
      class="f-popover-trigger"
    >
      <slot />
    </PopoverTrigger>
    <PopoverPortal>
      <PopoverContent
        :side="side"
        :align="align"
        :side-offset="sideOffset"
        :align-offset="alignOffset"
        :style="styles['popover-content']"
        class="f-popover-content"
      >
        <slot name="content" />
        <PopoverArrow
          v-if="arrow"
          :style="styles['popover-arrow']"
          class="f-popover-arrow"
        />
        <PopoverClose
          v-if="$slots.close"
          :style="styles['popover-close']"
          class="f-popover-close"
        >
          <slot name="close" />
        </PopoverClose>
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>

<style>
@import '#build/untheme/popover-trigger.css';
@import '#build/untheme/popover-content.css';
@import '#build/untheme/popover-arrow.css';
@import '#build/untheme/popover-close.css';
</style>
