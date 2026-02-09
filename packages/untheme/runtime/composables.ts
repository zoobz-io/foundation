import { useState } from "#app";

export const useUntheme = () => {
  const mode = useState<"light" | "dark">("untheme-mode", () => "dark");

  const setMode = (newMode: "light" | "dark") => {
    mode.value = newMode;
  };

  return {
    mode,
    setMode,
  };
};
