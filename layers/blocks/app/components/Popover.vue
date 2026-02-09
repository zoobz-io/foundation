<script setup lang="ts">
import type { PopoverProps } from "../types/popover";
import type { ReferenceElement } from "reka-ui";

const {
  reference,
  defaultOpen = false,
  modal = false,
  side = "bottom",
  align = "center",
  sideOffset = 10,
  alignOffset = 0,
  arrow = false,
} = defineProps<
  Omit<PopoverProps, "open"> & { reference?: ReferenceElement }
>();

const open = defineModel<boolean>("open", { default: false });

</script>

<template>
  <PopoverRoot v-model:open="open" :default-open="defaultOpen" :modal="modal">
    <PopoverAnchor v-if="reference" :reference="reference" />
    <PopoverAnchor v-else as-child>
      <slot />
    </PopoverAnchor>
    <PopoverPortal>
      <PopoverContent
        :side="side"
        :align="align"
        :side-offset="sideOffset"
        :align-offset="alignOffset"
        class="f-popover-content"
      >
        <slot name="content" />
        <PopoverArrow
          v-if="arrow"
          class="f-popover-arrow"
        />
        <PopoverClose
          v-if="$slots.close"
          class="f-popover-close"
        >
          <slot name="close" />
        </PopoverClose>
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>

