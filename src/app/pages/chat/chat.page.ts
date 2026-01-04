import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, 
  IonButtons, IonMenuButton, IonFooter, IonSpinner 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { sendOutline, hardwareChipOutline, personOutline } from 'ionicons/icons';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle, 
    IonContent, IonIcon, IonButtons, IonMenuButton, IonFooter, IonSpinner
  ]
})
export class ChatPage implements OnInit {
  @ViewChild(IonContent, { static: false }) content!: IonContent;
  private http = inject(HttpClient);

  pergunta: string = '';
  mensagens: { role: string, text: string }[] = [];
  carregando: boolean = false;

  private readonly GEMINI_KEY = "AIzaSyAnFlxbE1ga_okQ2kNwFt3sGcu57Wfxkts"; 

  constructor() {
    addIcons({ sendOutline, hardwareChipOutline, personOutline });
  }

  ngOnInit() {
    this.mensagens.push({ role: 'ultron', text: 'Conexão direta com a Nuvem Gemini ativa.' });
  }

  enviar() {
    if (!this.pergunta.trim() || this.carregando) return;

    const msgUsuario = this.pergunta;
    this.mensagens.push({ role: 'user', text: msgUsuario });
    this.pergunta = '';
    this.carregando = true;

    // URL CORRETA PARA MODELO FLASH 1.5
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.GEMINI_KEY}`;
    
    // O corpo da requisição precisa seguir exatamente esta estrutura de 'contents' e 'parts'
    const body = {
      contents: [{
        parts: [{
          text: `Você é o Ultron. Responda curto. Tags: DOCKER, CHROME, EDITOR. Pergunta: ${msgUsuario}`
        }]
      }]
    };

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post<any>(url, body, { headers }).subscribe({
      next: (res) => {
        if (res.candidates && res.candidates[0].content.parts[0].text) {
          const resposta = res.candidates[0].content.parts[0].text;
          this.mensagens.push({ role: 'ultron', text: resposta });
          this.acionarRoboLocal(resposta); // Envia o texto para o PC executar o script
        }
        this.carregando = false;
        this.scrollToBottom();
      },
      error: (err) => {
        console.error('Erro direto na Nuvem:', err);
        this.mensagens.push({ role: 'ultron', text: 'ERRO: A nuvem recusou a conexão direta.' });
        this.carregando = false;
        this.scrollToBottom();
      }
    });
  }

  acionarRoboLocal(texto: string) {
    // Chamada silenciosa apenas para o seu servidor rodar o Python (DOCKER, CHROME, etc)
    this.http.post('http://localhost:3000/ultron/chat', { mensagem: texto }).subscribe({
      error: () => console.log('Servidor local offline, mas a IA respondeu.')
    });
  }

  scrollToBottom() {
    setTimeout(() => { if (this.content) this.content.scrollToBottom(500); }, 100);
  }
}