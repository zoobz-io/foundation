<script lang="ts">
import { AvatarRoot, AvatarImage, AvatarFallback } from "reka-ui";
import type { AvatarProps } from "../types/avatar";
</script>

<script setup lang="ts">
const { src, alt, fallback, pt } = defineProps<AvatarProps>();

const el = useTemplateRef("el");
defineExpose({ el });

const rootPT = usePassthrough(pt?.root, {});
const imagePT = usePassthrough(pt?.image, {
  props: { src },
});
const fallbackPT = usePassthrough(pt?.fallback, {});

const ctx = computed(() => ({ src, alt, fallback }));
</script>

<template>
  <slot ref="el" name="root" v-bind="ctx">
    <AvatarRoot v-bind="rootPT.props" class="f-avatar-root" v-on="rootPT.handlers">
      <slot name="image" v-bind="ctx">
        <AvatarImage
          :alt="alt"
          v-bind="imagePT.props"
          class="f-avatar-image"
          v-on="imagePT.handlers"
        />
      </slot>
      <slot name="fallback" v-bind="ctx">
        <AvatarFallback
          v-bind="fallbackPT.props"
          class="f-avatar-fallback"
          v-on="fallbackPT.handlers"
        >
          {{ fallback }}
        </AvatarFallback>
      </slot>
    </AvatarRoot>
  </slot>
</template>
