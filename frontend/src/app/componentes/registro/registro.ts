import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { UsuarioService } from '../../core/services/usuario.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})
export class RegistroComponent {
  usuario = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    fecha_nacimiento: ''
  };

  mostrarPassword = false;
  mostrarConfirmPassword = false;
  mensajeError = '';
  cargando = false;

  constructor(
    private servicio: UsuarioService,
    private router: Router
  ) {}

  registrar() {
    this.mensajeError = '';

    // Validaciones
    if (!this.usuario.name.trim()) {
      this.mensajeError = '❌ El nombre es requerido';
      return;
    }

    if (!this.usuario.email.trim()) {
      this.mensajeError = '❌ El email es requerido';
      return;
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.usuario.email)) {
      this.mensajeError = '❌ El email no es válido';
      return;
    }

    if (!this.usuario.password) {
      this.mensajeError = '❌ La contraseña es requerida';
      return;
    }

    if (this.usuario.password.length < 6) {
      this.mensajeError = '❌ La contraseña debe tener al menos 6 caracteres';
      return;
    }

    if (this.usuario.password !== this.usuario.confirmPassword) {
      this.mensajeError = '❌ Las contraseñas no coinciden';
      return;
    }

    // Preparar datos para enviar (sin confirmPassword)
    const datosRegistro = {
      name: this.usuario.name.trim(),
      email: this.usuario.email.trim(),
      password: this.usuario.password,
      fecha_nacimiento: this.usuario.fecha_nacimiento || null
    };

    this.cargando = true;

    this.servicio.save(datosRegistro).subscribe({
      next: (res) => {
        this.cargando = false;
        console.log('✅ Usuario registrado exitosamente:', res);
        this.mostrarExito();
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500);
      },
      error: (err) => {
        this.cargando = false;
        console.error('Error al registrar:', err);
        
        // Manejar diferentes tipos de errores
        if (err.error?.message) {
          this.mensajeError = '❌ ' + err.error.message;
        } else if (err.status === 409) {
          this.mensajeError = '❌ Este email ya está registrado';
        } else if (err.status === 400) {
          this.mensajeError = '❌ Datos inválidos. Verifica los campos';
        } else {
          this.mensajeError = '❌ Error al registrar. Intenta nuevamente';
        }
      }
    });
  }

  mostrarExito() {
    // Mostrar notificación de éxito
    const notificacion = document.createElement('div');
    notificacion.textContent = '✅ ¡Registro exitoso! Redirigiendo...';
    notificacion.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
      color: white;
      padding: 16px 24px;
      border-radius: 12px;
      font-weight: 600;
      z-index: 9999;
      animation: slideInRight 0.4s ease-out;
      box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
    `;
    document.body.appendChild(notificacion);

    setTimeout(() => {
      notificacion.remove();
    }, 2000);
  }
}