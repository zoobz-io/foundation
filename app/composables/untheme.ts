export const useUntheme = () => {
  const store = accessUnthemeStore();
  const { mode, theme, tokens } = storeToRefs(store);
  return {
    mode,
    theme,
    tokens,
    setMode: store.setMode,
    setTheme: store.setTheme,
    resolve: store.resolve,
  };
};

export const useTokenStyle = <T extends keyof Untheme["roles"]>(
  tokens?: Tokens<T>,
) => {
  return computed(() => {
    const styles = {} as { [K in T]: Record<string, string> };

    if (!tokens) return styles;

    keys(tokens).forEach((role) => {
      const roleTokens = tokens[role];
      if (!roleTokens) return;

      const roleStyles: Record<string, string> = {};

      Object.entries(roleTokens).forEach(([token, value]) => {
        if (typeof value === "string") {
          roleStyles[`--${role}-${token}`] = `var(--${value})`;
        }
      });

      styles[role] = roleStyles;
    });

    return styles;
  });
};
