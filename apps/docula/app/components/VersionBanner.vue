<script setup lang="ts">
const route = useRoute();
const { current, latest, isLatest } = useVersion();

const latestUrl = computed(() => {
  const path = route.path.replace(/^\/v[\d.]+/, "");
  return `/v${latest}${path}`;
});
</script>

<template>
  <Banner
    v-if="!isLatest && current && latest"
    icon="info"
  >
    <span>
      You're viewing docs for <Strong>v{{ current }}</Strong
      >.
    </span>
    <Anchor :to="latestUrl">View latest (v{{ latest }})</Anchor>
  </Banner>
</template>
