<script lang="ts">
import { ScrollAreaRoot, ScrollAreaViewport, ScrollAreaScrollbar, ScrollAreaThumb, ScrollAreaCorner } from "reka-ui";
import type { ScrollerProps } from "../types/scroller";
</script>

<script setup lang="ts">
const {
  type = "hover",
  scrollHideDelay = 600,
  dir,
  orientation = "vertical",
  pt,
} = defineProps<ScrollerProps>();

const el = useTemplateRef("el");
defineExpose({ el });

const rootPT = usePassthrough(pt?.root, {
  props: { type, scrollHideDelay, dir },
});
const viewportPT = usePassthrough(pt?.viewport, {});
const scrollbarPT = usePassthrough(pt?.scrollbar, {});
const thumbPT = usePassthrough(pt?.thumb, {});
const cornerPT = usePassthrough(pt?.corner, {});

const ctx = computed(() => ({ type, scrollHideDelay, dir, orientation }));
</script>

<template>
  <ScrollAreaRoot
    ref="el"
    v-bind="rootPT.props"
    class="f-scroller-root"
    v-on="rootPT.handlers"
  >
    <ScrollAreaViewport v-bind="viewportPT.props" class="f-scroller-viewport" v-on="viewportPT.handlers">
      <slot v-bind="ctx" />
    </ScrollAreaViewport>

    <ScrollAreaScrollbar
      v-if="orientation === 'vertical' || orientation === 'both'"
      orientation="vertical"
      v-bind="scrollbarPT.props"
      class="f-scroller-scrollbar"
      v-on="scrollbarPT.handlers"
    >
      <ScrollAreaThumb v-bind="thumbPT.props" class="f-scroller-thumb" v-on="thumbPT.handlers" />
    </ScrollAreaScrollbar>

    <ScrollAreaScrollbar
      v-if="orientation === 'horizontal' || orientation === 'both'"
      orientation="horizontal"
      v-bind="scrollbarPT.props"
      class="f-scroller-scrollbar"
      v-on="scrollbarPT.handlers"
    >
      <ScrollAreaThumb v-bind="thumbPT.props" class="f-scroller-thumb" v-on="thumbPT.handlers" />
    </ScrollAreaScrollbar>

    <ScrollAreaCorner
      v-if="orientation === 'both'"
      v-bind="cornerPT.props"
      class="f-scroller-corner"
      v-on="cornerPT.handlers"
    />
  </ScrollAreaRoot>
</template>
