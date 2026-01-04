import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { 
  IonContent, IonHeader, IonToolbar, IonButtons, 
  IonTitle, IonButton, IonIcon, MenuController, AlertController 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  cubeOutline, codeSlashOutline, powerOutline, 
  statsChartOutline, logoChrome, chatbubblesOutline, menuOutline 
} from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    CommonModule, IonContent, IonHeader, IonToolbar, 
    IonButtons, IonTitle, IonButton, IonIcon
  ]
})
export class HomePage {
  private router = inject(Router);
  private http = inject(HttpClient);
  private menuCtrl = inject(MenuController);
  private alertCtrl = inject(AlertController);

  private readonly CORE_URL = 'http://localhost:3001/ultron';

  constructor() {
    addIcons({ 
      cubeOutline, codeSlashOutline, powerOutline, 
      statsChartOutline, logoChrome, chatbubblesOutline, menuOutline 
    });
  }

  async abrirMenu() {
    await this.menuCtrl.enable(true, 'ultron-menu');
    await this.menuCtrl.open('ultron-menu');
  }

  async confirmarDesligamento() {
    const alert = await this.alertCtrl.create({
      header: 'CONFIRMAR DESLIGAMENTO',
      message: 'Deseja desligar o servidor físico?',
      buttons: [
        { text: 'NÃO', role: 'cancel' },
        {
          text: 'SIM, DESLIGAR',
          handler: () => {
            this.http.post(`${this.CORE_URL}/system/power`, { action: 'shutdown' }).subscribe();
          }
        }
      ]
    });
    await alert.present();
  }

  irParaSeletorWorkspace() {
    this.router.navigate(['/workspace']);
  }

  dispararProtocolo(comando: string) {
    this.http.post(`${this.CORE_URL}/chat`, { mensagem: comando }).subscribe();
  }

  irParaChat(prompt: string) {
    this.router.navigate(['/chat'], { queryParams: { prompt } });
  }
  
  irParaEditor() {
    this.router.navigate(['/editor']);
  }
  
  irParaDoker() {
    this.router.navigate(['/doker']);
  }

  irParaMonitor() {
    this.router.navigate(['/monitor']);
  }

  encerrarSessao() {
    localStorage.removeItem('ultron_user');
    this.router.navigate(['/login']);
  }
}