<script setup lang="ts">
import type { FabProps } from "../types/fab";

const {
  icon,
  label,
  disabled,
  type = "button",
  shortcut,
  link,
} = defineProps<FabProps>();

const fabRef = useTemplateRef("fab");

if (shortcut) {
  const keys = useMagicKeys();
  const combo = computed(() => keys[shortcut]?.value);

  whenever(combo, () => {
    const el = fabRef.value as { $el?: HTMLElement } | HTMLElement | null;
    if (el && '$el' in el) {
      el.$el?.click();
    } else if (el instanceof HTMLElement) {
      el.click();
    }
  });
}

const NuxtLink = defineNuxtLink({});

const buttonProps = computed(() => ({
  type,
  disabled,
}));

const linkProps = computed(() => ({
  ...link,
  disabled,
}));
</script>

<template>
  <Primitive
    ref="fab"
    :as="link ? NuxtLink : 'button'"
    :aria-label="label"
    v-bind="link ? linkProps : buttonProps"
    class="f-fab"
  >
    <Icon :alias="icon" />
  </Primitive>
</template>

