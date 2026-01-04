import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { 
  IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, 
  IonList, IonItem, IonLabel, IonIcon, IonItemSliding, IonItemOptions, IonItemOption,
  ActionSheetController, IonModal, IonButton, ToastController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  logoAndroid, codeSlashOutline, libraryOutline, folderOutline, folderOpenOutline,
  openOutline, closeOutline, settingsOutline, searchOutline, trashOutline 
} from 'ionicons/icons';
import { EditorService } from '../../services/editor.service';
import { Editor } from '../../models/editor.model';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.page.html',
  styleUrls: ['./editor.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, IonContent, IonHeader, IonToolbar, 
    IonTitle, IonButtons, IonBackButton, IonList, IonItem, 
    IonLabel, IonIcon, IonItemSliding, IonItemOptions, IonItemOption,
    IonModal, IonButton
  ]
})
export class EditorPage implements OnInit {
  private editorService = inject(EditorService);
  private http = inject(HttpClient);
  private actionSheetCtrl = inject(ActionSheetController);
  private toastCtrl = inject(ToastController);
  
  editoresElite = [
    { nome: 'VS Code', comando: 'code', icon: 'code-slash-outline', color: '#007acc' },
    { nome: 'Android Studio', comando: 'android-studio', icon: 'logo-android', color: '#3ddc84' },
    { nome: 'Eclipse', comando: 'eclipse', icon: 'library-outline', color: '#2c2255' }
  ];

  projetosVinculados: Editor[] = [];
  isGestorOpen = false;
  novoProjeto = { nome: '', caminho: '' };

  constructor() {
    addIcons({ 
      logoAndroid, codeSlashOutline, libraryOutline, folderOutline, folderOpenOutline,
      openOutline, closeOutline, settingsOutline, searchOutline, trashOutline 
    });
  }

  ngOnInit() {
    this.carregarProjetos();
  }

  carregarProjetos() {
    this.editorService.getEditores().subscribe({
      next: (data: Editor[]) => {
        this.projetosVinculados = data.filter(e => e.caminho && e.caminho.includes('/'));
      }
    });
  }

  abrirExplorador() {
    this.http.get('http://localhost:3001/ultron/abrir-explorador').subscribe({
      next: (res: any) => {
        if (res.caminho) {
          this.novoProjeto.caminho = res.caminho.trim();
          this.novoProjeto.nome = res.caminho.split('/').pop() || '';
          this.exibirToast('Pasta selecionada!', 'success');
        }
      },
      error: () => this.exibirToast('Erro ao abrir explorador no Linux', 'danger')
    });
  }

  salvarProjetoNoBanco() {
    if (!this.novoProjeto.caminho || !this.novoProjeto.nome) {
      this.exibirToast('Preencha nome e caminho!', 'warning');
      return;
    }
    this.editorService.vincularManual(this.novoProjeto.caminho, this.novoProjeto.nome).subscribe({
      next: () => {
        this.carregarProjetos();
        this.novoProjeto = { nome: '', caminho: '' };
        this.exibirToast('Projeto salvo no banco!', 'success');
      }
    });
  }

  deletarProjeto(id: number | undefined) {
    if (id) {
      this.editorService.excluirEditor(id).subscribe(() => this.carregarProjetos());
    }
  }

  abrirSomenteEditor(item: any) {
    const payload: Editor = {
      nome: item.nome,
      comando: item.comando,
      caminho: '',
      selected: true,
      icon: item.icon
    };
    this.editorService.abrirWorkspace([payload]).subscribe();
  }

  async selecionarProjetoParaEditor(ed: any) {
    if (this.projetosVinculados.length === 0) {
      this.exibirToast('Nenhum projeto no banco.', 'warning');
      return;
    }

    const botoes = this.projetosVinculados.map(proj => ({
      text: proj.nome,
      icon: 'folder-outline',
      handler: () => this.abrirProjetoNoEditor(ed.comando, proj)
    }));

    const actionSheet = await this.actionSheetCtrl.create({
      header: `Abrir no ${ed.nome}`,
      buttons: [...botoes, { text: 'Cancelar', role: 'cancel', icon: 'close-outline' }]
    });
    await actionSheet.present();
  }

  abrirProjetoNoEditor(comando: string, projeto: Editor) {
    const payload: Editor = { ...projeto, comando: comando, selected: true };
    this.editorService.abrirWorkspace([payload]).subscribe();
  }

  async exibirToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({ message, color, duration: 2000 });
    toast.present();
  }
}