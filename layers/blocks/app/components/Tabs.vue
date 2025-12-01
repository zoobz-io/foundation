<script lang="ts">
export interface Tab {
  value: string;
  label: string;
  icon?: IconAlias;
  disabled?: boolean;
}

export interface TabsProps<T extends Tab> {
  tabs: T[];
  tokens?: Tokens<"tabs-root" | "tabs-list" | "tabs-trigger" | "tabs-content">;
}
</script>

<script setup lang="ts" generic="T extends Tab">
const { tabs, tokens } = defineProps<TabsProps<T>>();

const model = defineModel<string>();

const styles = useTokenStyle(tokens);
</script>

<template>
  <TabsRoot v-model="model" :style="styles['tabs-root']" class="f-tabs-root">
    <TabsList :style="styles['tabs-list']" class="f-tabs-list">
      <TabsTrigger
        v-for="tab in tabs"
        :key="tab.value"
        :value="tab.value"
        :disabled="tab.disabled"
        :style="styles['tabs-trigger']"
        class="f-tabs-trigger"
      >
        <Icon v-if="tab.icon" :alias="tab.icon" />
        {{ tab.label }}
      </TabsTrigger>
    </TabsList>

    <TabsContent
      v-for="tab in tabs"
      :key="tab.value"
      :value="tab.value"
      :style="styles['tabs-content']"
      class="f-tabs-content"
    >
      <slot :name="tab.value" />
    </TabsContent>
  </TabsRoot>
</template>

<style>
@import '#build/untheme/tabs-root.css';
@import '#build/untheme/tabs-list.css';
@import '#build/untheme/tabs-trigger.css';
@import '#build/untheme/tabs-content.css';
</style>
