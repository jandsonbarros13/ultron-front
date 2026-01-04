import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { 
  IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, 
  IonBackButton, IonList, IonItem, IonLabel, IonCheckbox, 
  IonButton, IonIcon, IonModal, IonItemSliding, IonItemOptions, IonItemOption 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  logoWhatsapp, logoDiscord, logoYoutube, logoChrome, 
  flashOutline, globeOutline, chatbubblesOutline, addOutline,
  trashOutline, pencilOutline, rocketOutline
} from 'ionicons/icons';

import { NavegadorService } from '../../services/navegador.service';
import { Site } from '../../models/site.model';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.page.html',
  styleUrls: ['./workspace.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, IonContent, IonHeader, IonToolbar, 
    IonTitle, IonButtons, IonBackButton, IonList, IonItem, 
    IonLabel, IonCheckbox, IonButton, IonIcon, IonModal,
    IonItemSliding, IonItemOptions, IonItemOption
  ]
})
export class WorkspacePage implements OnInit {
  private navegadorService = inject(NavegadorService);
  private router = inject(Router);

  sites: Site[] = [];
  isModalOpen = false;
  novoSite: any = { nome: '', url: '', icon: 'globe-outline' };

  constructor() {
    addIcons({ 
      logoWhatsapp, logoDiscord, logoYoutube, logoChrome, 
      flashOutline, globeOutline, chatbubblesOutline, addOutline,
      trashOutline, pencilOutline, rocketOutline
    });
  }

  ngOnInit() {
    this.carregarSites();
  }

  carregarSites() {
    this.navegadorService.listarSites().subscribe({
      next: (data) => this.sites = data,
      error: (err) => console.error('Erro ao carregar protocolos:', err)
    });
  }

  abrirModal(abrir: boolean) {
    if (!abrir) this.novoSite = { nome: '', url: '', icon: 'globe-outline' };
    this.isModalOpen = abrir;
  }

  prepararEdicao(site: Site) {
    this.novoSite = { ...site };
    this.isModalOpen = true;
  }

  salvarNovoSite() {
    if (!this.novoSite.nome || !this.novoSite.url) return;

    if (this.novoSite.id) {
      this.navegadorService.editarSite(this.novoSite).subscribe(() => {
        this.carregarSites();
        this.abrirModal(false);
      });
    } else {
      this.navegadorService.adicionarSite(this.novoSite).subscribe(() => {
        this.carregarSites();
        this.abrirModal(false);
      });
    }
  }

  deletarSite(id: number) {
    this.navegadorService.excluirSite(id).subscribe(() => this.carregarSites());
  }

  ativarUnico(url: string) {
    this.navegadorService.dispararWorkspace([url]).subscribe({
      next: () => this.router.navigate(['/home'])
    });
  }

  marcarTodos(event: any) {
    const isChecked = event.detail.checked;
    this.sites.forEach(site => {
      site.selected = isChecked;
      this.toggleSite(site);
    });
  }

  toggleSite(site: Site) {
    this.navegadorService.atualizarStatus({ id: site.id, selected: site.selected }).subscribe();
  }

  iniciarWorkspace() {
    const selecionados = this.sites.filter(s => s.selected).map(s => s.url);
    if (selecionados.length > 0) {
      this.navegadorService.dispararWorkspace(selecionados).subscribe({
        next: () => this.router.navigate(['/home'])
      });
    }
  }
}