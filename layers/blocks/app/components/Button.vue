<script setup lang="ts">
import type { ButtonProps } from "../types/button";

const {
  label,
  disabled,
  type = "button",
  shortcut,
  link,
} = defineProps<ButtonProps>();

const buttonRef = useTemplateRef("button");

if (shortcut) {
  const keys = useMagicKeys();
  const combo = computed(() => keys[shortcut]?.value);

  whenever(combo, () => {
    const el = buttonRef.value as { $el?: HTMLElement } | HTMLElement | null;
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
    ref="button"
    :as="link ? NuxtLink : 'button'"
    :aria-label="label"
    v-bind="link ? linkProps : buttonProps"
    class="f-button"
  >
    <slot name="prepend" />
    <slot>
      {{ label }}
    </slot>
    <slot name="append" />
  </Primitive>
</template>
