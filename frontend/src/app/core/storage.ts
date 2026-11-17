/**
 * localStorage wrappers that never throw. Storage can be missing or broken
 * (blocked site data, private mode, SSR/test runtimes where the global exists
 * without a working API), and losing a preference should never break the page.
 */
export function readStorage(key: string): string | null {
  try {
    return globalThis.localStorage?.getItem?.(key) ?? null;
  } catch {
    return null;
  }
}

export function writeStorage(key: string, value: string): void {
  try {
    globalThis.localStorage?.setItem?.(key, value);
  } catch {
    // Ignore: the preference simply won't persist.
  }
}
