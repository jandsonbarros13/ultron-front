import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Site, UpdateSiteDTO, WorkspaceDTO } from '../models/site.model';

@Injectable({
  providedIn: 'root'
})
export class NavegadorService {
  private http = inject(HttpClient);
  private readonly API = `${environment.apiUrl}/navegador`;

  listarSites(): Observable<Site[]> {
    return this.http.get<Site[]>(`${this.API}/sites`);
  }

  atualizarStatus(dados: UpdateSiteDTO): Observable<any> {
    return this.http.post(`${this.API}/update-site`, dados);
  }

  adicionarSite(novoSite: Partial<Site>): Observable<any> {
    return this.http.post(`${this.API}/add`, novoSite);
  }

  editarSite(site: Site): Observable<any> {
    return this.http.put(`${this.API}/update`, site);
  }

  excluirSite(id: number): Observable<any> {
    return this.http.delete(`${this.API}/delete/${id}`);
  }

  dispararWorkspace(urlsSelecionadas: string[]): Observable<any> {
    const payload: WorkspaceDTO = { urls: urlsSelecionadas };
    return this.http.post(`${this.API}/abrir-workspace`, payload);
  }
}