export type FabProps = {
  icon: IconAlias;
  label?: string;
  type?: "button" | "submit" | "reset";
  link?: Link;
  disabled?: boolean;
  shortcut?: ButtonShortcut;};

export type FabEmits = {};

export const defineFab = useComponentRecipe<
  FabProps,
  FabEmits & MouseEvents & FocusEvents
>();
