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
  link,
  badge,
  pt,
} = defineProps<FabProps>();

const el = useTemplateRef("el");
defineExpose({ el });

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
const rootPT = usePassthrough(pt?.root, () => ({
  props: { as: link ? NuxtLink : "button", "aria-label": label, ...(link ? linkProps.value : buttonProps.value), ...attrs },
  handlers: {},
}));
const tooltipPT = usePassthrough(pt?.tooltip, { props: { content: label }, handlers: {} });
const iconPT = usePassthrough(pt?.icon, { props: { alias: icon ?? "warning" }, handlers: {} });
const badgePT = usePassthrough(pt?.badge, { props: {}, handlers: {} });

const ctx = computed(() => ({ icon, label, disabled, type, link, badge }));
</script>

<template>
  <slot name="tooltip" v-bind="ctx">
    <Tooltip v-if="label" v-bind="tooltipPT.props" v-on="tooltipPT.handlers">
      <Primitive
        ref="el"
        v-bind="rootPT.props"
        class="f-fab"
        v-on="rootPT.handlers"
      >
        <slot name="icon" v-bind="ctx">
          <Icon v-if="icon" v-bind="iconPT.props" v-on="iconPT.handlers" />
        </slot>
        <slot name="badge" v-bind="ctx">
          <Group v-if="badge !== undefined" v-bind="badgePT.props" class="f-fab-badge" v-on="badgePT.handlers">{{ badge }}</Group>
        </slot>
      </Primitive>
    </Tooltip>
  </slot>
  <Primitive
    v-if="!label"
    ref="el"
    v-bind="rootPT.props"
    class="f-fab"
    v-on="rootPT.handlers"
  >
    <slot name="icon" v-bind="ctx">
      <Icon v-if="icon" v-bind="iconPT.props" v-on="iconPT.handlers" />
    </slot>
    <slot name="badge" v-bind="ctx">
      <Group v-if="badge !== undefined" v-bind="badgePT.props" class="f-fab-badge" v-on="badgePT.handlers">{{ badge }}</Group>
    </slot>
  </Primitive>
</template>
