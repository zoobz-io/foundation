<script setup lang="ts">
const { collection } = useAppConfig();
</script>

<template>
  <VersionBanner />
  <Main>
    <TopBar />
    <Left border>
      <ContentTree v-if="collection?.key" :collection="collection.key" />
    </Left>
    <slot />
  </Main>
</template>
