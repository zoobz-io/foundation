<script lang="ts">
import type { FacetsProps } from "../types/facets";
</script>

<script setup lang="ts">
const { groups, pt } = defineProps<FacetsProps>();

const el = useTemplateRef("el");
defineExpose({ el });

const selected = defineModel<Set<string>>("selected", { default: () => new Set() });
const open = ref(false);
const activeCount = computed(() => selected.value.size);

const popoverPT = usePassthrough(pt?.popover, () => ({
  props: { open: open.value, align: "end" as const },
  handlers: { "update:open": (v: boolean) => { open.value = v; } },
}));
const triggerPT = usePassthrough(pt?.trigger, () => ({
  props: { icon: "filter" as IconAlias, badge: activeCount.value > 0 ? activeCount.value : undefined },
  handlers: {},
}));
const commandPT = usePassthrough(pt?.command, () => ({
  props: { groups, placeholder: "Search filters...", multiple: true, selected: selected.value },
  handlers: { "update:selected": (v: Set<string>) => { selected.value = v; } },
}));

const ctx = computed(() => ({ groups, selected: selected.value, activeCount: activeCount.value }));
</script>

<template>
  <Popover v-bind="popoverPT.props" v-on="popoverPT.handlers">
    <template #trigger>
      <slot name="trigger" v-bind="ctx">
        <Fab v-bind="triggerPT.props" v-on="triggerPT.handlers" />
      </slot>
    </template>
    <template #content>
      <slot v-bind="ctx">
        <Command
          v-bind="commandPT.props"
          v-on="commandPT.handlers"
          @keydown.escape="open = false"
        />
      </slot>
    </template>
  </Popover>
</template>
