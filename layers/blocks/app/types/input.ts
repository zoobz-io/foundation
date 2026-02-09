export type InputShortcut = string;

export type InputProps = {
  type?: "text" | "email" | "password" | "search" | "url" | "tel" | "number";
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  shortcut?: InputShortcut;};

export type InputEmits = {};

export const defineInput = useComponentRecipe<
  InputProps,
  InputEmits & InputEvents & FocusEvents
>();
