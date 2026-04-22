import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private URL = 'http://localhost:3000/api/v1/usuariocontroller';

  constructor(private http: HttpClient) { }

  save(data: any) {
    return this.http.post(`${this.URL}/save`, data);
  }

  getAll() {
    return this.http.get(this.URL);
  }
}