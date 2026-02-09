export type AnchorProps = {
  label?: string;
  to?: string;
  icon?: IconAlias;
  description?: string;
  external?: boolean;
  target?: "_blank" | "_self";
  replace?: boolean;
  prefetch?: boolean;
  disabled?: boolean;};

export type AnchorEmits = {};

export const defineAnchor = useComponentRecipe<
  AnchorProps,
  AnchorEmits & MouseEvents & FocusEvents
>();
