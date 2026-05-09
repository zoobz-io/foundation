<script lang="ts">
import type { AppThemeProps } from "../../types/app-theme";
</script>

<script setup lang="ts">
const { pt } = defineProps<AppThemeProps>();

const el = useTemplateRef("el");
defineExpose({ el });

const open = ref(false);
const { theme, setTheme, themes } = useUntheme();

const groups = computed<CommandGroup[]>(() => [
  {
    key: "themes",
    label: "Themes",
    items: themes.value.map((entry) => ({
      value: entry.key,
      label: entry.label,
      disabled: entry.key === theme.value,
    })),
  },
]);

const onSelect = (value: string) => {
  setTheme(value);
  open.value = false;
};

const ctx = computed(() => ({ open: open.value, theme: theme.value, themes: themes.value }));
</script>

<template>
  <Popover
    ref="el"
    v-bind="pt?.root"
    :open="open"
    class="f-app-theme"
    @update:open="open = $event"
  >
    <template #trigger>
      <slot name="trigger" v-bind="ctx">
        <Fab
          v-bind="pt?.trigger"
          icon="theme"
          class="f-app-theme-trigger"
        />
      </slot>
    </template>

    <template #content>
      <slot name="command" v-bind="ctx">
        <Command
          v-bind="pt?.command"
          :groups="groups"
          placeholder="Search themes..."
          class="f-app-theme-command"
          @select="onSelect"
        />
      </slot>
    </template>
  </Popover>
</template>
