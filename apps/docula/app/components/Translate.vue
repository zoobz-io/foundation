<script setup lang="ts">
const open = ref(false);

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
    <Fab shortcut="meta+l" icon="translate" @click="open = true" />
    <template #content>
      <span>Translate</span>
      <Kbd>
        {{ modKey }}
        <Icon alias="plus" />
        L
      </Kbd>
    </template>
  </Tooltip>

  <Dialog
    v-model:open="open"
    title="Translate languages"
    description="I am a banana"
  >
    <P>Language selection dialog content</P>
  </Dialog>
</template>
