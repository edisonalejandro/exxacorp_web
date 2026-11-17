import { DOCUMENT, Injectable, computed, effect, inject, signal } from '@angular/core';
import { Lang, translations } from './translations';
import { readStorage, writeStorage } from './storage';

const STORAGE_KEY = 'exxacorp-lang';

function detectInitialLang(): Lang {
  const stored = readStorage(STORAGE_KEY);
  if (stored === 'en' || stored === 'es') return stored;
  if (typeof navigator !== 'undefined' && navigator.language?.toLowerCase().startsWith('en')) {
    return 'en';
  }
  return 'es';
}

@Injectable({ providedIn: 'root' })
export class I18nService {
  readonly lang = signal<Lang>(detectInitialLang());
  readonly content = computed(() => translations[this.lang()]);

  private readonly document = inject(DOCUMENT);

  constructor() {
    // Keep <html lang> in sync so screen readers and browser translation use the right language.
    effect(() => {
      this.document.documentElement.lang = this.lang();
    });
  }

  setLang(lang: Lang): void {
    this.lang.set(lang);
    writeStorage(STORAGE_KEY, lang);
  }

  toggle(): void {
    this.setLang(this.lang() === 'es' ? 'en' : 'es');
  }
}
