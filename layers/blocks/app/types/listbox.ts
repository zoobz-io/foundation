export type ListboxProps = {
  items: Option[];
  modelValue?: string | string[];
  multiple?: boolean;
  disabled?: boolean;};

export type ListboxEmits = {
  "update:modelValue": [string | string[]];
};

export const defineListbox = useComponentRecipe<
  ListboxProps,
  ListboxEmits & FocusEvents
>();
