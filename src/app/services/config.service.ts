import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private _ip: string = '192.168.1.112'; // Seu IP atualizado
  private _port: string = '3000';

  constructor() {}

  getUrl(endpoint: string): string {
    return `http://${this._ip}:${this._port}/comando/${endpoint}`;
  }
}