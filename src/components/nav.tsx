"use client";

import { ThemeSwitcher } from "./theme-switcher";

export default function Navigation() {
  return (
    <nav className="z-50w-full sticky top-0">
      <div className="mx-auto flex max-w-4xl items-center justify-end px-4 py-4 sm:py-6">
        <div className="flex items-center space-x-2">
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
}
