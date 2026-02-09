<script setup lang="ts">
import type { TreeProps, TreeEmits, TreeNode } from "../types/tree";

const {
  items,
  modelValue,
  expanded,
  multiple = false,
  selectionBehavior = "toggle",
} = defineProps<TreeProps>();

const emit = defineEmits<TreeEmits>();

const getKey = (item: TreeNode) => item.value;
const getChildren = (item: TreeNode) => item.children;

const handleUpdate = (value: TreeNode | TreeNode[]) => {
  emit("update:modelValue", value);
};

const handleExpanded = (value: string[]) => {
  emit("update:expanded", value);
};

const NuxtLinkComponent = defineNuxtLink({});
</script>

<template>
  <TreeRoot
    :model-value="modelValue"
    :expanded="expanded"
    :items="items"
    :multiple="multiple"
    :selection-behavior="selectionBehavior"
    :get-key="getKey"
    :get-children="getChildren"
    class="f-tree-root"
    @update:model-value="handleUpdate"
    @update:expanded="handleExpanded"
  >
    <template #default="{ flattenItems }">
      <TreeItem
        v-for="item in flattenItems"
        :key="item._id"
        v-bind="item.bind"
        v-slot="{ isExpanded, isSelected }"
        :as="item.hasChildren ? 'li' : NuxtLinkComponent"
        :to="item.hasChildren ? undefined : item.value.to"
        :style="item.hasChildren ? styles['tree-branch'] : styles['tree-leaf']"
        :class="item.hasChildren ? 'f-tree-branch' : 'f-tree-leaf'"
      >
        <!-- Branch (expandable item with children) -->
        <span
          v-if="item.hasChildren"
          :style="{
            ...styles['tree-branch-content'],
            paddingLeft: `calc(var(--tree-branch-content-padding-left, 1rem) + ${item.level - 1} * 1rem)`,
          }"
          class="f-tree-branch-content"
        >
          <slot name="branch" :item="item.value" :is-expanded="isExpanded">
            <div class="f-tree-branch-label">
              <Icon v-if="item.value.icon" :alias="item.value.icon" />
              <span>{{ item.value.label }}</span>
            </div>
            <Icon :alias="isExpanded ? 'chevron-down' : 'chevron-right'" />
          </slot>
        </span>

        <!-- Leaf (link item without children) -->
        <span
          v-else
          :style="{
            ...styles['tree-leaf-content'],
            paddingLeft: `calc(var(--tree-leaf-content-padding-left, 1rem) + ${item.level - 1} * 1rem)`,
          }"
          class="f-tree-leaf-content"
        >
          <slot name="leaf" :item="item.value" :is-selected="isSelected">
            <Icon v-if="item.value.icon" :alias="item.value.icon" />
            <span>{{ item.value.label }}</span>
          </slot>
        </span>
      </TreeItem>
    </template>
  </TreeRoot>
</template>

