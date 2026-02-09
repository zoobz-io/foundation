export type NavigatorProps = {
  items: NavigatorItem[];
  orientation?: "horizontal" | "vertical";
  indicator?: boolean;
  delayDuration?: number;
  skipDelayDuration?: number;
  featured?: Link;};

export type NavigatorEmits = {};

export const defineNavigator = useComponentRecipe<NavigatorProps, NavigatorEmits>();
