"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";
import { useCallback, useEffect } from "react";

export function ThemeSwitcher() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  const handleThemeChange = useCallback(
    (newTheme: string) => {
      setTheme(newTheme);
    },
    [setTheme],
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex h-12 items-center rounded-lg border border-gray-200 p-1 [background-color:var(--color-background-light)] hover:border-gray-300 dark:border-gray-800 dark:[background-color:var(--color-background-dark)] dark:hover:border-gray-600 sm:h-auto">
      <button
        type="button"
        onClick={() => handleThemeChange("light")}
        className={`rounded-md p-2 transition-colors sm:p-1 ${
          resolvedTheme === "light"
            ? "bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-white"
            : "text-gray-500 dark:text-gray-400"
        }`}
      >
        <Sun className="h-5 w-5 sm:h-4 sm:w-4" />
        <span className="sr-only">Light mode</span>
      </button>

      <button
        type="button"
        onClick={() => handleThemeChange("dark")}
        className={`rounded-md p-2 transition-colors sm:p-1 ${
          resolvedTheme === "dark"
            ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white"
            : "text-gray-500 dark:text-gray-400"
        }`}
      >
        <Moon className="h-5 w-5 sm:h-4 sm:w-4" />
        <span className="sr-only">Dark mode</span>
      </button>
    </div>
  );
}
