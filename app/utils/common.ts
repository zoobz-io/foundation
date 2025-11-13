export const keys = <T extends Record<string, unknown>>(
  value: T,
): (keyof T)[] => Object.keys(value) as (keyof T)[];
