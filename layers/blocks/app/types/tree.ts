export type TreeProps = {
  items: TreeNode[];
  modelValue?: TreeNode | TreeNode[];
  expanded?: string[];
  multiple?: boolean;
  selectionBehavior?: "replace" | "toggle";};

export type TreeEmits = {
  "update:modelValue": [TreeNode | TreeNode[]];
  "update:expanded": [string[]];
};

export const defineTree = useComponentRecipe<TreeProps, TreeEmits>();
