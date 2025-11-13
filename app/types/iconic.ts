import aliases from "#build/iconic.config.mjs";

export type Iconic = typeof aliases;
export type IconAlias = keyof Iconic;
export type Icon = Iconic[IconAlias];
