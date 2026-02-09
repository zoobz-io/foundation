export type AvatarProps = {
  src: string;
  alt?: string;
  fallback?: string;};

export type AvatarEmits = {};

export const defineAvatar = useComponentRecipe<AvatarProps, AvatarEmits>();
