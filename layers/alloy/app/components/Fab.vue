<script lang="ts">
import { Primitive } from "reka-ui";
import type { FabProps } from "../types/fab";
</script>

<script setup lang="ts">
defineOptions({ inheritAttrs: false });

const {
  icon,
  label,
  disabled,
  type = "button",
  shortcut,
  link,
  badge,
  pt,
} = defineProps<FabProps>();

const el = useTemplateRef("el");
defineExpose({ el });

if (shortcut) {
  const keys = useMagicKeys();
  const combo = computed(() => keys[shortcut]?.value);

  whenever(combo, () => {
    const target = el.value as { $el?: HTMLElement } | HTMLElement | null;
    if (target && '$el' in target) {
      target.$el?.click();
    } else if (target instanceof HTMLElement) {
      target.click();
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

const attrs = useAttrs();
const rootPT = usePassthrough(pt?.root, {
  props: { ...(link ? linkProps.value : buttonProps.value), ...attrs },
});
const badgePT = usePassthrough(pt?.badge, {});

const ctx = computed(() => ({ icon, label, disabled, type, shortcut, link, badge }));
</script>

<template>
  <Tooltip v-if="label" :content="label">
    <Primitive
      ref="el"
      :as="link ? NuxtLink : 'button'"
      :aria-label="label"
      v-bind="rootPT.props"
      class="f-fab"
      v-on="rootPT.handlers"
    >
      <slot v-bind="ctx">
        <Icon v-if="icon" :alias="icon" />
      </slot>
      <slot name="badge" v-bind="ctx">
        <Group v-if="badge !== undefined" v-bind="badgePT.props" class="f-fab-badge" v-on="badgePT.handlers">{{ badge }}</Group>
      </slot>
    </Primitive>
  </Tooltip>
  <Primitive
    v-else
    ref="el"
    :as="link ? NuxtLink : 'button'"
    :aria-label="label"
    v-bind="rootPT.props"
    class="f-fab"
    v-on="rootPT.handlers"
  >
    <slot v-bind="ctx">
      <Icon v-if="icon" :alias="icon" />
    </slot>
    <slot name="badge" v-bind="ctx">
      <Group v-if="badge !== undefined" v-bind="badgePT.props" class="f-fab-badge" v-on="badgePT.handlers">{{ badge }}</Group>
    </slot>
  </Primitive>
</template>
