import type { ButtonProps } from "~/components/Button.vue";

export const defineButton = (
  props: ButtonProps,
  handlers: { click?: () => void } = {},
) => ({ props, handlers });
