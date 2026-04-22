import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../servicios/usuario';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  email = '';
  password = '';
  mostrarPassword = false;

  constructor(private servicio: UsuarioService, private router: Router) {}

  iniciarSesion() {
    this.servicio.login(this.email, this.password).subscribe({
      next: (res) => {
        alert('¡Bienvenido!');
        this.router.navigate(['/principal']); 
      },
      error: (err) => {
        alert('Correo o contraseña incorrectos');
      }
    });
  }
}