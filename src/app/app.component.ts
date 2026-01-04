import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { MenuComponent } from './components/menu/menu.component'; // Verifique o caminho correto

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet, MenuComponent], // MenuComponent adicionado aqui
})
export class AppComponent {
  constructor() {}
}