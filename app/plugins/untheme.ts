export default defineNuxtPlugin(() => {
  const { tokens, resolve } = useUntheme();

  const cssVariables = computed(() => {
    const declarations = keys(tokens.value)
      .filter((token) => !token.startsWith("ref-"))
      .map((token) => {
        const value = resolve(token);
        return value === "__IGNORE__" ? null : `--${token}: ${value};`;
      })
      .filter(Boolean);

    return `:root {\n${declarations.join("\n")}\n}`;
  });

  useHead({
    style: [
      {
        innerHTML: () => cssVariables.value,
        tagPriority: "high",
      },
    ],
  });
});
