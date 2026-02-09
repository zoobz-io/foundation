export type SelectProps = {
  options: Option[];
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  name?: string;};

export type SelectEmits = {};

export const defineSelect = useComponentRecipe<
  SelectProps,
  SelectEmits & FocusEvents
>();
