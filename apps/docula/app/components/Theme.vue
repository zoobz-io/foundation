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
    <Fab shortcut="meta+t" icon="theme" @click="open = true" />
    <template #content>
      <span>Theme</span>
      <Kbd>
        {{ modKey }}
        <Icon alias="plus" />
        T
      </Kbd>
    </template>
  </Tooltip>

  <Dialog
    v-model:open="open"
    title="I am a Theme selector!"
    description="change your theme bro"
  >
    <P>Theme selection dialog content</P>
  </Dialog>
</template>
