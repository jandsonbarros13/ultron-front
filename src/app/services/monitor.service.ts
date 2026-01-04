import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SystemStats } from '../models/monitor.model';

@Injectable({
  providedIn: 'root',
})
export class MonitorService {
  private http = inject(HttpClient);
  private readonly API_URL = `${environment.apiUrl}/system/stats`;

  getStats() {
    return this.http.get<SystemStats>(this.API_URL);
  }
}