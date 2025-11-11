import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonHeader, IonToolbar, IonTitle, IonButtons, IonSegment, IonSegmentButton } from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { ThemeService, type ThemeMode } from '../services/theme.service';
import { addIcons } from 'ionicons';
import { checkmarkDone, list, sunny, moon, settings } from 'ionicons/icons';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  imports: [
    CommonModule,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonLabel,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonSegment,
    IonSegmentButton,
    TranslateModule
  ],
})
export class TabsPage {
  currentTheme: ThemeMode = 'system';

  constructor(private themeService: ThemeService) {
    this.currentTheme = this.themeService.getTheme();
    addIcons({ checkmarkDone, list, sunny, moon, settings });
  }

  /**
   * Se ejecuta cuando el usuario cambia el tema desde el segment
   */
  async onThemeChange(event: any): Promise<void> {
    const newTheme = event.detail.value as ThemeMode;
    this.currentTheme = newTheme;
    await this.themeService.setTheme(newTheme, true);
  }

  /**
   * Retorna un label amigable para mostrar en el segment
   */
  getThemeLabel(theme: ThemeMode): string {
    return this.themeService.getThemeLabel(theme);
  }

  /**
   * Obtiene los temas disponibles
   */
  getAvailableThemes(): ThemeMode[] {
    return this.themeService.getAvailableThemes();
  }
}
