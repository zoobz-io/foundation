export type PopoverProps = {
  open?: boolean;
  defaultOpen?: boolean;
  modal?: boolean;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  sideOffset?: number;
  alignOffset?: number;
  arrow?: boolean;};

export type PopoverEmits = {
  "update:open": [value: boolean];
};

export const definePopover = useComponentRecipe<PopoverProps, PopoverEmits>();
