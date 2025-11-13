import theme from "#build/untheme.config.mjs";
import defu from "defu";

export interface UnthemeState {
  mode: "light" | "dark";
  theme: Untheme;
}

export const accessUnthemeStore = defineStore("untheme", {
  state: (): UnthemeState => ({
    mode: "dark",
    theme: { ...theme },
  }),

  getters: {
    tokens: (state): Record<Token, string> => {
      const roles = keys(state.theme.roles);
      const roleTokens = roles.reduce(
        (tokens, role) => {
          const roleAttrs = keys(state.theme.roles[role]);

          roleAttrs.forEach((attr) => {
            const key = tokenize(role, attr);
            tokens[key] = state.theme.roles[role][attr];
          });

          return tokens;
        },
        {} as Record<RoleToken, string>,
      );
      return {
        ...state.theme.reference,
        ...state.theme.modes[state.mode],
        ...roleTokens,
      };
    },
  },

  actions: {
    setMode(mode: "light" | "dark") {
      this.mode = mode;
    },

    setTheme(theme: UnthemeConfig) {
      this.theme = defu<Untheme, [Untheme]>(theme, this.theme);
    },

    isToken(value: string): value is Token {
      return value in this.tokens;
    },

    resolve(token: Token): string {
      const value = this.tokens[token];
      return this.isToken(value) ? this.resolve(value) : value;
    },
  },
});
