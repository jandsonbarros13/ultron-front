import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { 
  IonIcon, 
  IonMenu, 
  IonContent 
} from '@ionic/angular/standalone'; 
import { MenuController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { 
  gridOutline, 
  chatbubbleEllipsesOutline, 
  logOutOutline,
  cubeOutline 
} from 'ionicons/icons';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    IonIcon, 
    IonMenu, 
    IonContent
  ] // Registro obrigatório nos imports
})
export class MenuComponent {
  private router = inject(Router);
  private menuCtrl = inject(MenuController);

  constructor() {
    addIcons({ 
      gridOutline, 
      chatbubbleEllipsesOutline, 
      logOutOutline,
      cubeOutline 
    });
  }

  async navegar(rota: string) {
    await this.menuCtrl.close('ultron-menu');
    this.router.navigate([rota]);
  }

  async sair() {
    localStorage.removeItem('ultron_user');
    await this.menuCtrl.close('ultron-menu');
    this.router.navigate(['/login']);
  }
}