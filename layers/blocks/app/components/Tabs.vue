<script lang="ts">

export interface TabsProps<T extends Option> {
  tabs: T[];}
</script>

<script setup lang="ts" generic="T extends Option">
const { tabs: tabItems } = defineProps<TabsProps<T>>();

const model = defineModel<string>();

</script>

<template>
  <TabsRoot v-model="model" class="f-tabs-root">
    <TabsList class="f-tabs-list">
      <TabsTrigger
        v-for="tab in tabItems"
        :key="tab.value"
        :value="tab.value"
        :disabled="tab.disabled"
        class="f-tabs-trigger"
      >
        <Icon v-if="tab.icon" :alias="tab.icon" />
        {{ tab.label }}
      </TabsTrigger>
    </TabsList>

    <TabsContent
      v-for="tab in tabItems"
      :key="tab.value"
      :value="tab.value"
      class="f-tabs-content"
    >
      <slot :name="tab.value" />
    </TabsContent>
  </TabsRoot>
</template>

