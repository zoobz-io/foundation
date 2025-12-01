<script lang="ts">
export interface TreeNode {
  value: string;
  label: string;
  icon?: IconAlias;
  to?: string;
  children?: TreeNode[];
  disabled?: boolean;
}

export interface TreeProps {
  items: TreeNode[];
  modelValue?: TreeNode | TreeNode[];
  expanded?: string[];
  multiple?: boolean;
  selectionBehavior?: "replace" | "toggle";
  tokens?: Tokens<
    | "tree-root"
    | "tree-branch"
    | "tree-branch-content"
    | "tree-branch-label"
    | "tree-leaf"
    | "tree-leaf-content"
  >;
}

export interface TreeEmits {
  "update:modelValue": [TreeNode | TreeNode[]];
  "update:expanded": [string[]];
}
</script>

<script setup lang="ts">
const {
  items,
  modelValue,
  expanded,
  multiple = false,
  selectionBehavior = "toggle",
  tokens,
} = defineProps<TreeProps>();

const emit = defineEmits<TreeEmits>();

const styles = useTokenStyle(tokens);

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
    :style="styles['tree-root']"
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
            <div class="f-tree-branch-label" :style="styles['tree-branch-label']">
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

<style>
@import '#build/untheme/tree-root.css';
@import '#build/untheme/tree-branch.css';
@import '#build/untheme/tree-branch-content.css';
@import '#build/untheme/tree-branch-label.css';
@import '#build/untheme/tree-leaf.css';
@import '#build/untheme/tree-leaf-content.css';
</style>
