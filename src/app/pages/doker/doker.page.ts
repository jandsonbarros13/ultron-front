import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, 
  IonList, IonItem, IonLabel, IonIcon, 
  IonBadge, IonButton, IonSpinner, IonRefresher, 
  IonRefresherContent, AlertController, MenuController 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  cubeOutline, playOutline, stopOutline, 
  refreshOutline, menuOutline 
} from 'ionicons/icons';
import { DockerContainer } from '../../models/docker.model';
import { DockerService } from 'src/app/services/doker.service';

@Component({
  selector: 'app-doker',
  templateUrl: './doker.page.html',
  styleUrls: ['./doker.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, 
    IonList, IonItem, IonLabel, IonIcon, 
    IonBadge, IonButton, IonSpinner, IonRefresher, 
    IonRefresherContent, CommonModule, FormsModule
  ]
})
export class DokerPage implements OnInit {
  private dockerService = inject(DockerService);
  private alertCtrl = inject(AlertController);
  private menuCtrl = inject(MenuController);
  
  containers: DockerContainer[] = [];
  loading = false;

  constructor() {
    addIcons({ 
      cubeOutline, playOutline, stopOutline, 
      refreshOutline, menuOutline 
    });
  }

  ngOnInit() {
    setTimeout(() => {
      this.carregarContainers();
    }, 200);
  }

  async abrirMenu() {
    await this.menuCtrl.enable(true, 'ultron-menu');
    await this.menuCtrl.open('ultron-menu');
  }

  carregarContainers(event?: any) {
    this.loading = true;
    this.dockerService.getContainers().subscribe({
      next: (data: DockerContainer[]) => {
        this.containers = data;
        this.loading = false;
        if (event) event.target.complete();
      },
      error: () => {
        this.loading = false;
        if (event) event.target.complete();
      }
    });
  }

  async toggleAction(container: DockerContainer) {
    const isRunning = container.state === 'running';
    const action = isRunning ? 'stop' : 'start';
    const acaoTexto = isRunning ? 'PARAR' : 'INICIAR';

    const alert = await this.alertCtrl.create({
      header: 'CONFIRMAÇÃO',
      message: `Deseja realmente ${acaoTexto} o container ${container.name}?`,
      cssClass: 'custom-alert',
      buttons: [
        { text: 'CANCELAR', role: 'cancel' },
        {
          text: 'CONFIRMAR',
          handler: () => {
            this.dockerService.toggleContainer(container.id, action).subscribe({
              next: () => this.carregarContainers(),
              error: (err) => console.error(err)
            });
          }
        }
      ]
    });

    await alert.present();
  }
}