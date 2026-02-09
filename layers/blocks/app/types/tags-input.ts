export type TagsInputProps = {
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  max?: number;
  addOnBlur?: boolean;
  addOnPaste?: boolean;
  addOnTab?: boolean;
  delimiter?: string;
  duplicate?: boolean;};

export type TagsInputEmits = {};

export const defineTagsInput = useComponentRecipe<
  TagsInputProps,
  TagsInputEmits & FocusEvents
>();
