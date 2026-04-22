import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Nota {
  id?: number;
  titulo: string;
  contenido: string;
  color?: string;
  usuarioId: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotasService {
  private URL = 'http://localhost:3000/api/v1/notacontroller';

  constructor(private http: HttpClient) { }

  save(data: Nota) {
    return this.http.post<Nota>(`${this.URL}/save`, data);
  }

  getAll() {
    return this.http.get<Nota[]>(this.URL);
  }

  getById(id: number) {
    return this.http.get<Nota>(`${this.URL}/${id}`);
  }

  getByUsuarioId(usuarioId: number) {
    return this.http.get<Nota[]>(`${this.URL}/usuario/${usuarioId}`);
  }

  update(id: number, data: Partial<Nota>) {
    return this.http.put<Nota>(`${this.URL}/${id}`, data);
  }

  delete(id: number) {
    return this.http.delete(`${this.URL}/${id}`);
  }
}
