<script lang="ts">

export interface NavListItem {
  label: string;
  to: string;
  icon?: IconAlias;
}

export interface NavListGroup {
  label: string;
  icon?: IconAlias;
  items: NavListItem[];
}

export interface NavListProps {
  groups: NavListGroup[];}
</script>

<script setup lang="ts">
const props = defineProps<NavListProps>();

const route = useRoute();

const isActive = (to: string) => route.path === to;
</script>

<template>
  <nav
    class="f-nav-list-root"
  >
    <div
      v-for="group in props.groups"
      :key="group.label"
      class="f-nav-list-group"
    >
      <Caption :icon="group.icon">
        {{ group.label }}
      </Caption>
      <NuxtLink
        v-for="item in group.items"
        :key="item.to"
        :to="item.to"
        :aria-selected="isActive(item.to) ? 'true' : undefined"
        :data-selected="isActive(item.to) ? '' : undefined"
        class="f-nav-list-item"
      >
        <Icon v-if="item.icon" :alias="item.icon" />
        <span class="f-nav-list-label">{{ item.label }}</span>
      </NuxtLink>
    </div>
  </nav>
</template>

