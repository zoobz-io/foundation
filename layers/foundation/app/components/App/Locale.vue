<script lang="ts">
import type { AppLocaleProps } from "../../types/app-locale";
</script>

<script setup lang="ts">
const { pt } = defineProps<AppLocaleProps>();

const el = useTemplateRef("el");
defineExpose({ el });

const open = ref(false);
const { locale, locales, setLocale } = useRosetta();

const groups = computed<CommandGroup[]>(() => [
  {
    key: "locales",
    label: "Language",
    items: locales.value.map((code) => {
      const display = new Intl.DisplayNames([code], { type: "language" });
      return {
        value: code,
        label: display.of(code) ?? code,
        disabled: code === locale.value,
      };
    }),
  },
]);

const onSelect = async (value: string) => {
  await setLocale(value);
  open.value = false;
};

const ctx = computed(() => ({ open: open.value, locale: locale.value, locales: locales.value }));
</script>

<template>
  <Popover
    ref="el"
    v-bind="pt?.root"
    :open="open"
    align="end"
    class="f-app-locale"
    @update:open="open = $event"
  >
    <template #trigger>
      <slot name="trigger" v-bind="ctx">
        <Fab
          v-bind="pt?.trigger"
          icon="translate"
          class="f-app-locale-trigger"
        />
      </slot>
    </template>

    <template #content>
      <slot name="command" v-bind="ctx">
        <Command
          v-bind="pt?.command"
          :groups="groups"
          placeholder="Search languages..."
          class="f-app-locale-command"
          @select="onSelect"
        />
      </slot>
    </template>
  </Popover>
</template>
