import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeroComponent } from './sections/hero/hero.component';
import { AttackChainComponent } from './sections/attack-chain/attack-chain.component';
import { ServicesComponent } from './sections/services/services.component';
import { AboutComponent } from './sections/about/about.component';
import { ContactComponent } from './sections/contact/contact.component';
import { PrivacyComponent } from './sections/privacy/privacy.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, HeroComponent, AttackChainComponent, ServicesComponent, AboutComponent, ContactComponent, PrivacyComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.html',
})
export class App {
  /**
   * El sitio es una sola página con anclas; /privacidad es la única otra
   * vista. Vercel reescribe toda ruta a index.html (vercel.json), así que
   * basta con mirar la ruta al cargar, sin router.
   */
  protected readonly isPrivacy =
    typeof location !== 'undefined' && location.pathname.replace(/\/+$/, '') === '/privacidad';
}
