<script lang="ts">
import type { PageProps } from "../types/page";
</script>

<script setup lang="ts">
const { store, pt } = defineProps<PageProps>();

const el = useTemplateRef("el");
defineExpose({ el });

const slots = computed(() => store.layout.value.slots);
const ctx = computed(() => ({ store }));
</script>

<template>
  <Group ref="el" v-bind="pt?.root" class="f-page">
    <slot name="header" v-bind="ctx">
      <Header v-bind="pt?.header" class="f-page-header" />
    </slot>

    <Group v-bind="pt?.grid" class="f-page-grid" :style="store.gridStyle.value">
      <Group
        v-for="s in slots"
        :key="s.id"
        class="f-page-slot"
        :style="store.slotStyle(s)"
      >
        <slot :name="s.id" v-bind="{ ...ctx, slot: s }" />
      </Group>
    </Group>

    <slot name="footer" v-bind="ctx">
      <Footer v-bind="pt?.footer" class="f-page-footer" />
    </slot>
  </Group>
</template>
