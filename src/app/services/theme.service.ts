import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

export type ThemeMode = 'light' | 'dark' | 'system';

const THEME_KEY = 'app-theme-preference';

/**
 * ThemeService
 * Gestiona los temas claro/oscuro de la aplicación.
 * 
 * Características:
 * - Detecta preferencia del sistema automáticamente
 * - Persiste la preferencia en localStorage (Capacitor)
 * - Aplica atributo data-theme en el <html>
 * - Escucha cambios del sistema cuando está en modo 'system'
 */
@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private current: ThemeMode = 'system';
  private mediaQueryList: MediaQueryList | null = null;

  constructor() {}

  /**
   * Inicializa el servicio al cargar la app
   * Carga la preferencia guardada o detecta del sistema
   */
  async init(): Promise<void> {
    try {
      const saved = await Preferences.get({ key: THEME_KEY });
      const savedTheme = (saved.value as ThemeMode) || 'system';
      await this.setTheme(savedTheme, false); // false = no guardar de nuevo
    } catch (error) {
      console.warn('Error loading theme preference:', error);
      await this.setTheme('system', false);
    }
  }

  /**
   * Cambia el tema de la aplicación
   * @param mode 'light' | 'dark' | 'system'
   * @param persist Si true, guarda en localStorage
   */
  async setTheme(mode: ThemeMode, persist = true): Promise<void> {
    this.current = mode;
    
    const html = document.documentElement;
    
    // Limpia el atributo actual
    html.removeAttribute('data-theme');

    // Calcula el modo efectivo
    let effectiveTheme: 'light' | 'dark' = 'light';
    
    if (mode === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      effectiveTheme = prefersDark ? 'dark' : 'light';
    } else {
      effectiveTheme = mode;
    }

    // Aplica el atributo si es 'dark'
    if (effectiveTheme === 'dark') {
      html.setAttribute('data-theme', 'dark');
    }

    // Guarda la preferencia
    if (persist) {
      try {
        await Preferences.set({ key: THEME_KEY, value: mode });
      } catch (error) {
        console.warn('Error saving theme preference:', error);
      }
    }
  }

  /**
   * Obtiene el modo actual (puede ser 'light', 'dark' o 'system')
   */
  getTheme(): ThemeMode {
    return this.current;
  }

  /**
   * Obtiene el tema efectivo que se está usando (siempre 'light' o 'dark')
   */
  getEffectiveTheme(): 'light' | 'dark' {
    if (this.current === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return this.current;
  }

  /**
   * Alterna entre los tres modos: light -> dark -> system -> light
   */
  async cycleTheme(): Promise<void> {
    const themes: ThemeMode[] = ['light', 'dark', 'system'];
    const currentIndex = themes.indexOf(this.current);
    const nextIndex = (currentIndex + 1) % themes.length;
    await this.setTheme(themes[nextIndex], true);
  }

  /**
   * Inicia el listener para cambios del sistema
   * Se ejecuta continuamente si el modo es 'system'
   */
  bindSystemPreferenceChange(): void {
    if (this.mediaQueryList) {
      return; // Ya hay un listener activo
    }

    this.mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handler = (event: MediaQueryListEvent) => {
      if (this.current === 'system') {
        // Si estamos en modo 'system', reaplica el tema
        const effectiveTheme = event.matches ? 'dark' : 'light';
        const html = document.documentElement;
        
        if (effectiveTheme === 'dark') {
          html.setAttribute('data-theme', 'dark');
        } else {
          html.removeAttribute('data-theme');
        }
      }
    };

    // Para compatibilidad con navegadores antiguos
    if (this.mediaQueryList.addEventListener) {
      this.mediaQueryList.addEventListener('change', handler);
    } else if ((this.mediaQueryList as any).addListener) {
      (this.mediaQueryList as any).addListener(handler);
    }
  }

  /**
   * Obtiene los modos disponibles
   */
  getAvailableThemes(): ThemeMode[] {
    return ['light', 'dark', 'system'];
  }

  /**
   * Retorna un label amigable para mostrar en la UI
   */
  getThemeLabel(theme: ThemeMode): string {
    const labels: Record<ThemeMode, string> = {
      light: '☀️ Claro',
      dark: '🌙 Oscuro',
      system: '🖥️ Sistema'
    };
    return labels[theme];
  }
}
