import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Usuario {
  id?: number;
  name: string;
  email: string;
  password?: string;
  fecha_nacimiento?: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private URL = 'http://localhost:3000/api/v1/usuariocontroller';

  constructor(private http: HttpClient) { }

  save(data: Usuario) {
    return this.http.post<Usuario>(`${this.URL}/save`, data);
  }

  getAll() {
    return this.http.get<Usuario[]>(this.URL);
  }

  getById(id: number) {
    return this.http.get<Usuario>(`${this.URL}/${id}`);
  }

  update(id: number, data: Partial<Usuario>) {
    return this.http.put<Usuario>(`${this.URL}/${id}`, data);
  }

  delete(id: number) {
    return this.http.post(`${this.URL}/delete/${id}`, {});
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${this.URL}/login`, { email, password });
  }
}
