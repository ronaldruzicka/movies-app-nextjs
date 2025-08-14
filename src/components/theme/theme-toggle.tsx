'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Toggle } from '@/components/ui/toggle';

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <Toggle
      aria-label="Toggle dark mode"
      onPressedChange={() => {
        setTheme(resolvedTheme === 'light' ? 'dark' : 'light');
      }}
      size="sm"
      title="Toggle dark mode"
      variant="outline"
    >
      {resolvedTheme === 'light' ? <Sun /> : <Moon />}
    </Toggle>
  );
}
