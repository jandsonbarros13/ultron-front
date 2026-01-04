import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonIcon, IonToast } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personOutline, lockClosedOutline, fingerPrintOutline } from 'ionicons/icons';
import { AuthService } from '../../services/auth.service';
import { LoginDTO } from '../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, IonIcon, IonToast]
})
export class LoginPage {
  // Injeção de dependências moderna
  private authService = inject(AuthService);
  private router = inject(Router);

  // Modelo de dados usando o DTO
  credentials: LoginDTO = {
    username: '',
    password: ''
  };

  // Estado da UI
  showToast = false;
  toastMessage = '';
  isPending = false;

  constructor() {
    addIcons({ personOutline, lockClosedOutline, fingerPrintOutline });
  }

  fazerLogin() {
    if (!this.credentials.username || !this.credentials.password) {
      this.presentToast('INSIRA AS CREDENCIAIS DE OPERADOR');
      return;
    }

    this.isPending = true;
    console.log('📡 Solicitando acesso ao Ultron Core...');

    this.authService.login(this.credentials).subscribe({
      next: (res) => {
        this.isPending = false;
        if (res.success) {
          console.log(`✅ Bem-vindo, Operador ${res.user.nome}`);
          this.router.navigate(['/home']);
        }
      },
      error: (err) => {
        this.isPending = false;
        console.error('❌ Bloqueio de segurança:', err);
        this.presentToast('ACESSO NEGADO: CREDENCIAIS INVÁLIDAS');
      }
    });
  }

  presentToast(message: string) {
    this.toastMessage = message;
    this.showToast = true;
  }
}