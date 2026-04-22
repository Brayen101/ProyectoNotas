import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuarioActual = new BehaviorSubject<Usuario | null>(null);
  usuarioActual$ = this.usuarioActual.asObservable();

  constructor() {
    // Recuperar usuario de localStorage si existe
    const usuarioGuardado = localStorage.getItem('usuarioActual');
    if (usuarioGuardado) {
      try {
        this.usuarioActual.next(JSON.parse(usuarioGuardado));
      } catch (error) {
        console.error('Error al recuperar usuario del localStorage:', error);
      }
    }
  }

  setUsuarioActual(usuario: Usuario) {
    this.usuarioActual.next(usuario);
    localStorage.setItem('usuarioActual', JSON.stringify(usuario));
  }

  getUsuarioActual(): Usuario | null {
    return this.usuarioActual.value;
  }

  logout() {
    this.usuarioActual.next(null);
    localStorage.removeItem('usuarioActual');
  }

  estaAutenticado(): boolean {
    return this.usuarioActual.value !== null;
  }
}
