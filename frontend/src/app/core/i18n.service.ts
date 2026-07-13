import { Injectable, computed, signal } from '@angular/core';
import { Lang, translations } from './translations';

const STORAGE_KEY = 'exxacorp-lang';

function detectInitialLang(): Lang {
  if (typeof localStorage !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'en' || stored === 'es') return stored;
  }
  if (typeof navigator !== 'undefined' && navigator.language?.toLowerCase().startsWith('en')) {
    return 'en';
  }
  return 'es';
}

@Injectable({ providedIn: 'root' })
export class I18nService {
  readonly lang = signal<Lang>(detectInitialLang());
  readonly content = computed(() => translations[this.lang()]);

  setLang(lang: Lang): void {
    this.lang.set(lang);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, lang);
    }
  }

  toggle(): void {
    this.setLang(this.lang() === 'es' ? 'en' : 'es');
  }
}
