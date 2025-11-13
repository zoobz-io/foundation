<script lang="ts">
import { ConfigProvider } from "reka-ui";
</script>

<script setup lang="ts">
const useIdFunction = () => useId();
</script>

<template>
  <ConfigProvider :use-id="useIdFunction">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </ConfigProvider>
</template>

<style>
html,
body {
  background: var(--sys-surface);
}

::selection {
  background: var(--sys-primary);
  color: var(--sys-on-primary);
}
</style>
