import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-logiin',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './logiin.html',
  styleUrl: './logiin.css',
})
export class LogiinComponent {
  credenciales = {
    email: '',
    password: '',
  };

  showPassword = false;

  constructor(private readonly router: Router) {}

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  iniciarSesion(): void {
    if (!this.credenciales.email || !this.credenciales.password) {
      alert('Completa correo y contraseña.');
      return;
    }

    alert('Inicio de sesión listo para conectar con backend.');
    this.router.navigate(['/registro']);
  }
}