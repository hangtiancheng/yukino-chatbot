import { resolvedThemeAtom, themeAtom } from "@/stores/settings";
import { useAtomValue } from "jotai";
import { useEffect, type PropsWithChildren } from "react";

function ThemeProvider({ children }: PropsWithChildren) {
  const theme = useAtomValue(themeAtom);
  const resolvedTheme = useAtomValue(resolvedThemeAtom);

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    root.classList.add(resolvedTheme);

    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        "content",
        resolvedTheme === "dark" ? "#292120" : "#fdf3f1",
      );
    }
  }, [resolvedTheme]);

  useEffect(() => {
    if (theme !== "system") {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = () => {
      const root = window.document.documentElement;
      const newTheme = mediaQuery.matches ? "dark" : "light";
      root.classList.remove("light", "dark");
      root.classList.add(newTheme);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  return <>{children}</>;
}

export default ThemeProvider;
