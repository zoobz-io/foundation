<script setup lang="ts">
import type { BreadcrumbsProps } from "../types/breadcrumbs";

const {
  items,
  separator = "chevron-right",
} = defineProps<BreadcrumbsProps>();

const isLast = (index: number) => index === items.length - 1;
</script>

<template>
  <nav
    aria-label="Breadcrumb"
    class="f-breadcrumbs-root"
  >
    <ol class="f-breadcrumbs-list">
      <li
        v-for="(item, index) in items"
        :key="item.to"
        class="f-breadcrumbs-item"
      >
        <span
          v-if="isLast(index)"
          class="f-breadcrumbs-current"
        >
          <slot
            name="item"
            :item="item"
            :index="index"
            :is-last="true"
          >
            <Icon v-if="item.icon" :alias="item.icon" />
            {{ item.label }}
          </slot>
        </span>
        <NuxtLink
          v-else
          :to="item.to"
          class="f-breadcrumbs-link"
        >
          <slot
            name="item"
            :item="item"
            :index="index"
            :is-last="false"
          >
            <Icon v-if="item.icon" :alias="item.icon" />
            {{ item.label }}
          </slot>
        </NuxtLink>

        <span
          v-if="!isLast(index)"
          class="f-breadcrumbs-separator"
        >
          <slot name="separator">
            <Icon :alias="separator" />
          </slot>
        </span>
      </li>
    </ol>
  </nav>
</template>

