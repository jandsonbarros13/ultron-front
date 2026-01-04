import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, 
  IonButton, IonIcon, IonGrid, IonRow, IonCol, MenuController 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  menuOutline, refreshOutline, hardwareChipOutline, 
  speedometerOutline, discOutline, listOutline 
} from 'ionicons/icons';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.page.html',
  styleUrls: ['./monitor.page.scss'],
  standalone: true,
  imports: [
    CommonModule, IonContent, IonHeader, IonTitle, 
    IonToolbar, IonButtons, IonButton, IonIcon,
    IonGrid, IonRow, IonCol
  ]
})
export class MonitorPage implements OnInit, OnDestroy {
  private http = inject(HttpClient);
  private menuCtrl = inject(MenuController);
  
  private readonly MONITOR_URL = 'http://localhost:3001/ultron/system/monitor';
  
  stats: any = null;
  updateTimer: any;

  constructor() {
    addIcons({ 
      menuOutline, refreshOutline, hardwareChipOutline, 
      speedometerOutline, discOutline, listOutline 
    });
  }

  ngOnInit() {
    this.refreshStats();
    this.updateTimer = setInterval(() => this.refreshStats(), 5000);
  }

  ngOnDestroy() {
    if (this.updateTimer) clearInterval(this.updateTimer);
  }

  refreshStats() {
    this.http.get(this.MONITOR_URL).subscribe({
      next: (data) => this.stats = data,
      error: (err) => console.error('Erro Core 3001:', err)
    });
  }

  async abrirMenu() {
    await this.menuCtrl.enable(true, 'ultron-menu');
    await this.menuCtrl.open('ultron-menu');
  }
}