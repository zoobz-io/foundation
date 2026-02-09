<script setup lang="ts">
import type { TooltipProps } from "../types/tooltip";

const {
  content,
  delayDuration = 0,
  side = "bottom",
  align = "center",
  sideOffset = 10,
} = defineProps<TooltipProps>();

</script>

<template>
  <TooltipRoot :delay-duration="delayDuration">
    <TooltipTrigger as-child>
      <slot />
    </TooltipTrigger>
    <TooltipPortal>
      <TooltipContent
        :side="side"
        :align="align"
        :side-offset="sideOffset"
        class="f-tooltip-content"
      >
        <slot name="content">
          {{ content }}
        </slot>
      </TooltipContent>
    </TooltipPortal>
  </TooltipRoot>
</template>

