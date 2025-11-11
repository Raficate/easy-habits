import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor(
    private translate: TranslateService,
    private theme: ThemeService
  ) {
    this.initializeApp();
  }

  private async initializeApp() {
    // Inicializar idioma
    this.initializeLanguage();

    // Inicializar tema
    await this.theme.init();
    this.theme.bindSystemPreferenceChange();
  }

  private initializeLanguage() {
    // Detectar idioma del navegador o usar español por defecto
    const browserLanguage = this.translate.getBrowserLang();
    const language = browserLanguage?.includes('en') ? 'en' : 'es';
    this.translate.use(language);
  }
}
