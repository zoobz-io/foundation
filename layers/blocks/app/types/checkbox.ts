export type CheckboxProps = {
  disabled?: boolean;
  name?: string;
  value?: string;
  required?: boolean;};

export type CheckboxEmits = {};

export const defineCheckbox = useComponentRecipe<
  CheckboxProps,
  CheckboxEmits & FocusEvents
>();
