<script lang="ts">
import type { AppColormodeProps } from "../../types/app-colormode";
</script>

<script setup lang="ts">
const { pt } = defineProps<AppColormodeProps>();

const el = useTemplateRef("el");
defineExpose({ el });

const { mode, toggleMode } = useUntheme();

const icon = computed(() => mode.value === "dark" ? "dark" : "light");

const ctx = computed(() => ({ mode: mode.value }));
</script>

<template>
  <Group ref="el" v-bind="pt?.root" class="f-app-colormode">
    <slot name="trigger" v-bind="ctx">
      <Fab
        v-bind="pt?.trigger"
        :icon="icon"
        class="f-app-colormode-trigger"
        @click="toggleMode"
      />
    </slot>
  </Group>
</template>
