<script setup lang="ts">
import type { AvatarProps } from "../types/avatar";

const { src, alt, fallback } = defineProps<AvatarProps>();

</script>

<template>
  <AvatarRoot class="f-avatar-root">
    <AvatarImage
      :src="src"
      :alt="alt"
      class="f-avatar-image"
    />
    <AvatarFallback
      class="f-avatar-fallback"
    >
      <slot name="fallback">
        {{ fallback }}
      </slot>
    </AvatarFallback>
  </AvatarRoot>
</template>

