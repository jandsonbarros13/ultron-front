import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DockerContainer } from '../models/docker.model';

@Injectable({
  providedIn: 'root',
})
export class DockerService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/docker`;

  getContainers(): Observable<DockerContainer[]> {
    return this.http.get<DockerContainer[]>(`${this.apiUrl}/list`);
  }

  toggleContainer(id: string, action: 'start' | 'stop'): Observable<any> {
    return this.http.post(`${this.apiUrl}/action`, { id, action });
  }
}