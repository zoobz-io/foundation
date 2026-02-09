<script setup lang="ts">
const { mode, isMonospace, toggle } = useFontMode();

const label = computed(() => (isMonospace.value ? "Monospace" : "Sans-serif"));

const isMac = computed(() => {
  if (typeof navigator !== "undefined") {
    return navigator.platform.toUpperCase().includes("MAC");
  }
  return false;
});

const modKey = computed(() => (isMac.value ? "⌘" : "Ctrl"));
</script>

<template>
  <Tooltip>
    <Fab
      shortcut="meta+m"
      icon="font"
      :data-selected="isMonospace || undefined"
      @click="toggle"
    />
    <template #content>
      <span>{{ label }}</span>
      <Kbd>
        {{ modKey }}
        <Icon alias="plus" />
        M
      </Kbd>
    </template>
  </Tooltip>
</template>
