import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotasService, Nota } from '../../core/services/notas.service';

@Component({
  selector: 'app-notas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './notas.html',
  styleUrl: './notas.css'
})
export class NotasComponent implements OnInit {
  estaEditando = false;
  horaEditado = '';
  notas: Nota[] = [];
  usuarioId = 1; // Cambiar esto por el ID del usuario autenticado

  notaFormulario: Nota = {
    titulo: '',
    contenido: '',
    color: '#202124',
    usuarioId: this.usuarioId
  };

  constructor(private notasService: NotasService) {}

  ngOnInit() {
    this.cargarNotas();
  }

  cargarNotas() {
    this.notasService.getByUsuarioId(this.usuarioId).subscribe(
      (data: Nota[]) => {
        this.notas = data;
      },
      (error) => {
        console.error('Error al cargar notas:', error);
      }
    );
  }

  expandir() {
    this.estaEditando = true;
    this.actualizarHoraEdicion();
  }

  cerrar() {
    this.estaEditando = false;
    this.horaEditado = '';
    this.notaFormulario = {
      titulo: '',
      contenido: '',
      color: '#202124',
      usuarioId: this.usuarioId
    };
  }

  actualizarHoraEdicion() {
    const ahora = new Date();
    this.horaEditado = ahora.toLocaleTimeString('es-ES', {
      hour: 'numeric',
      minute: '2-digit'
    });
  }

  guardarNota() {
    if (this.notaFormulario.titulo.trim() && this.notaFormulario.contenido.trim()) {
      this.notasService.save(this.notaFormulario).subscribe(
        (nota: Nota) => {
          this.notas.push(nota);
          this.cerrar();
          console.log('Nota guardada:', nota);
        },
        (error) => {
          console.error('Error al guardar nota:', error);
        }
      );
    }
  }

  eliminarNota(id: number | undefined) {
    if (id) {
      this.notasService.delete(id).subscribe(
        () => {
          this.notas = this.notas.filter(n => n.id !== id);
          console.log('Nota eliminada');
        },
        (error) => {
          console.error('Error al eliminar nota:', error);
        }
      );
    }
  }
}