<script lang="ts">
import { TooltipRoot, TooltipTrigger, TooltipPortal, TooltipContent } from "reka-ui";
import type { TooltipProps } from "../types/tooltip";
</script>

<script setup lang="ts">
const {
  content,
  delayDuration = 0,
  side = "bottom",
  align = "center",
  sideOffset = 10,
  pt,
} = defineProps<TooltipProps>();

const el = useTemplateRef("el");
defineExpose({ el });

const rootPT = usePassthrough(pt?.root, {
  props: { delayDuration },
});
const contentPT = usePassthrough(pt?.content, {
  props: { side, align, sideOffset },
});

const ctx = computed(() => ({ content, delayDuration, side, align, sideOffset }));
</script>

<template>
  <TooltipRoot ref="el" v-bind="rootPT.props" v-on="rootPT.handlers">
    <TooltipTrigger as-child>
      <slot v-bind="ctx" />
    </TooltipTrigger>
    <TooltipPortal>
      <TooltipContent
        v-bind="contentPT.props"
        class="f-tooltip-content"
        v-on="contentPT.handlers"
      >
        <slot name="content" v-bind="ctx">
          {{ content }}
        </slot>
      </TooltipContent>
    </TooltipPortal>
  </TooltipRoot>
</template>
