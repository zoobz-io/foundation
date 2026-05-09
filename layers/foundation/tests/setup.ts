import { vi } from "vitest";
import { ref, computed } from "vue";
import { status } from "ltrl-http";

// Foundation auto-imports
vi.stubGlobal("status", status);
vi.stubGlobal("createError", (input: Record<string, unknown>) => {
  const err = new Error(typeof input === "string" ? input : (input.message ?? "")) as Error & Record<string, unknown>;
  if (typeof input === "object") {
    err.statusCode = input.statusCode;
    err.fatal = input.fatal;
    err.data = input.data;
  }
  return err;
});
vi.stubGlobal("showError", vi.fn());
const _unthemeMode = ref<"light" | "dark">("dark");
const _unthemeTheme = ref("cyberdream");
const _unthemeThemes = computed(() => [
  { key: "cyberdream", label: "Cyberdream" },
  { key: "nord", label: "Nord" },
  { key: "dracula", label: "Dracula" },
]);
vi.stubGlobal("useUntheme", () => ({
  mode: _unthemeMode,
  theme: _unthemeTheme,
  themes: _unthemeThemes,
  init: async () => null,
  load: async () => null,
  setTheme: async (name: string) => { _unthemeTheme.value = name; },
  setMode: (value: "light" | "dark") => { _unthemeMode.value = value; },
  toggleMode: () => { _unthemeMode.value = _unthemeMode.value === "dark" ? "light" : "dark"; },
  themeCSS: computed(() => ""),
}));
vi.stubGlobal("clearError", vi.fn());
vi.stubGlobal("useHead", vi.fn());

const _rosettaLocale = ref("en");
const _rosettaLocales = computed(() => ["en", "es", "fr"]);
const _rosettaMessages = ref<Record<string, string>>({});
vi.stubGlobal("useRosetta", () => ({
  locale: _rosettaLocale,
  locales: _rosettaLocales,
  messages: _rosettaMessages,
  setLocale: async (code: string) => { _rosettaLocale.value = code; },
}));
vi.stubGlobal("$t", (text: string) => _rosettaMessages.value[text] ?? text);

interface MockUser {
  id: string;
  roles?: string[];
  scopes?: string[];
}
const _authUser = ref<MockUser | null>(null);
const _authInitialized = ref(false);
vi.stubGlobal("useAuth", () => ({
  user: _authUser,
  authenticated: computed(() => _authUser.value !== null),
  initialized: _authInitialized,
  login: vi.fn(),
  logout: vi.fn(),
}));
vi.stubGlobal("hasRole", (...roles: string[]) => {
  if (!_authUser.value) return false;
  const userRoles = _authUser.value.roles;
  if (!userRoles) return false;
  return roles.every((r) => userRoles.includes(r));
});
vi.stubGlobal("hasScope", (...scopes: string[]) => {
  if (!_authUser.value) return false;
  const userScopes = _authUser.value.scopes;
  if (!userScopes) return false;
  return scopes.every((s) => userScopes.includes(s));
});

vi.stubGlobal("log", {
  debug: vi.fn(),
  info: vi.fn(),
  warn: vi.fn(),
  error: vi.fn(),
  fatal: vi.fn(),
});
