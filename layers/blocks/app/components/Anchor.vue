<script setup lang="ts">
import type { AnchorProps } from "../types/anchor";

const { label, to, external, target, replace, prefetch, disabled } =
  defineProps<AnchorProps>();

</script>

<template>
  <NuxtLink
    :to="disabled ? undefined : to"
    :external="external"
    :target="target"
    :replace="replace"
    :prefetch="prefetch"
    :aria-disabled="disabled"
    :aria-current="disabled ? 'page' : undefined"
    class="f-a"
  >
    <slot>
      {{ label }}
    </slot>
  </NuxtLink>
</template>

