import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private readonly LANGUAGE_KEY = 'app_language';
  private availableLanguages = ['es', 'en'];

  constructor(private translate: TranslateService) {}

  /**
   * Establece el idioma de la aplicación
   */
  setLanguage(lang: string): void {
    if (this.availableLanguages.includes(lang)) {
      this.translate.use(lang);
      localStorage.setItem(this.LANGUAGE_KEY, lang);
    }
  }

  /**
   * Obtiene el idioma actual
   */
  getCurrentLanguage(): string {
    return localStorage.getItem(this.LANGUAGE_KEY) || this.translate.currentLang || 'es';
  }

  /**
   * Obtiene los idiomas disponibles
   */
  getAvailableLanguages(): string[] {
    return this.availableLanguages;
  }

  /**
   * Alterna entre español e inglés
   */
  toggleLanguage(): void {
    const current = this.getCurrentLanguage();
    const newLang = current === 'es' ? 'en' : 'es';
    this.setLanguage(newLang);
  }
}
