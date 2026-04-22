import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../servicios/usuario';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})
export class RegistroComponent {
  usuario = {
    name: '',
    email: '',
    password: '',
    fecha_nacimiento: ''
  };

  constructor(private servicio: UsuarioService) {}

  registrar() {
    this.servicio.save(this.usuario).subscribe({
      next: (res) => {
        alert('¡Usuario guardado con éxito!');
        console.log(res);
      },
      error: (err) => {
        console.error(err);
        alert('Error al guardar: revisa la consola');
      }
    });
  }
}