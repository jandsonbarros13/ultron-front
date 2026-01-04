import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Editor } from '../models/editor.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EditorService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/editor`;

  getEditores(): Observable<Editor[]> {
    return this.http.get<Editor[]>(this.apiUrl);
  }

  adicionarEditor(editor: Editor): Observable<any> {
    return this.http.post(this.apiUrl, editor);
  }

  vincularManual(caminho: string, nome: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/vincular-manual`, { 
      caminho, 
      nomePersonalizado: nome 
    });
  }

  sincronizar(): Observable<any> {
    return this.http.get(`${this.apiUrl}/sincronizar`);
  }

  scanDisco(): Observable<any> {
    return this.http.get(`${this.apiUrl}/scan-disco`);
  }

  atualizarStatus(id: number, selected: boolean): Observable<any> {
    return this.http.post(`${this.apiUrl}/atualizar-status`, { id, selected });
  }

  excluirEditor(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  abrirWorkspace(projetos: Editor[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/abrir`, { projetos });
  }
}