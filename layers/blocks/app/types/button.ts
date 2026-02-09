export type ButtonProps = {
  label?: string;
  type?: "button" | "submit" | "reset";
  link?: Link;
  disabled?: boolean;
  shortcut?: ButtonShortcut;
};

export type ButtonEmits = {};

export const defineButton = useComponentRecipe<
  ButtonProps,
  ButtonEmits & MouseEvents & FocusEvents
>();
