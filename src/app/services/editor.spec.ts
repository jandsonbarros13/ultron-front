import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class EditorService {
  private http = inject(HttpClient);
  private readonly API = `${environment.apiUrl}/editor`; // Ajuste conforme suas rotas

  listarEditores() { return this.http.get<any[]>(`${this.API}/listar`); }
  adicionarEditor(dados: any) { return this.http.post(`${this.API}/add`, dados); }
  atualizarStatus(id: number, selected: boolean) { return this.http.post(`${this.API}/update-status`, { id, selected }); }
  excluirEditor(id: number) { return this.http.delete(`${this.API}/delete/${id}`); }
  dispararEditor(projetos: any[]) { return this.http.post(`${this.API}/abrir`, { projetos }); }
}