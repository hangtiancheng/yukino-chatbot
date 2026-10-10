import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { MODELS, type ModelType } from "@/types";

export type Theme = "light" | "dark" | "system";

const getInitialTheme = (): Theme => {
  const saved = localStorage.getItem("theme") as Theme | null;
  return saved ?? "system";
};

export const themeAtom = atomWithStorage<Theme>("theme", getInitialTheme());

export const resolvedThemeAtom = atom((get) => {
  const theme = get(themeAtom);
  if (theme !== "system") {
    return theme;
  }
  if (typeof window === "undefined") {
    return "light";
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
});

export const languageAtom = atomWithStorage<string>("language", "zh");

export const modelAtom = atomWithStorage<ModelType>(
  "yukino_chatbot_model",
  MODELS.OPENAI_MODEL,
);
