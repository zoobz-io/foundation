<script lang="ts">
export interface TooltipProps {
  content?: string;
  delayDuration?: number;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  sideOffset?: number;
  tokens?: Tokens<"tooltip-content">;
}
</script>

<script setup lang="ts">
const {
  content,
  delayDuration = 0,
  side = "bottom",
  align = "center",
  sideOffset = 10,
  tokens,
} = defineProps<TooltipProps>();

const styles = useTokenStyle(tokens);
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
        :style="styles['tooltip-content']"
        class="f-tooltip-content"
      >
        <slot name="content">
          {{ content }}
        </slot>
      </TooltipContent>
    </TooltipPortal>
  </TooltipRoot>
</template>

<style>
@import '#build/untheme/tooltip-content.css';
</style>
