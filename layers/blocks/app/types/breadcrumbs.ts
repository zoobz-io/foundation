export type BreadcrumbsProps = {
  items: Link[];
  separator?: IconAlias;};

export type BreadcrumbsEmits = {};

export const defineBreadcrumbs = useComponentRecipe<BreadcrumbsProps, BreadcrumbsEmits>();
