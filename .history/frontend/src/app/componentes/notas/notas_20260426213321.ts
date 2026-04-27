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
  notas: Nota[] = [];
  usuarioId = 1; // Cambiar esto por el ID del usuario autenticado
  modoCreacion: 'normal' | 'lista' | 'dibujo' | 'imagen' = 'normal';
  imagenPreview = '';
  imagenNombre = '';

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
    this.abrirEditor('normal');
  }

  abrirEditor(modo: 'normal' | 'lista' | 'dibujo' | 'imagen' = 'normal', event?: Event) {
    if (event) {
      event.stopPropagation();
    }

    this.estaEditando = true;
    this.modoCreacion = modo;

    if (modo === 'lista' && !this.notaFormulario.contenido.trim()) {
      this.notaFormulario.contenido = '- ';
    }
  }

  abrirSelectorImagen(input: HTMLInputElement, event: Event) {
    event.stopPropagation();
    this.abrirEditor('imagen');
    input.click();
  }

  onImagenSeleccionada(event: Event) {
    const input = event.target as HTMLInputElement;
    const archivo = input.files?.[0];

    if (!archivo) {
      return;
    }

    this.imagenNombre = archivo.name;
    this.modoCreacion = 'imagen';

    const reader = new FileReader();
    reader.onload = () => {
      this.imagenPreview = String(reader.result || '');
    };
    reader.readAsDataURL(archivo);
  }

  get placeholderContenido(): string {
    if (this.modoCreacion === 'lista') return 'Escribe los elementos de tu lista...';
    if (this.modoCreacion === 'dibujo') return 'Describe tu dibujo...';
    if (this.modoCreacion === 'imagen') return 'Agrega una descripción de la imagen...';
    return 'Añade una nota...';
  }

  cerrar() {
    this.estaEditando = false;
    this.modoCreacion = 'normal';
    this.imagenPreview = '';
    this.imagenNombre = '';
    this.notaFormulario = {
      titulo: '',
      contenido: '',
      color: '#202124',
      usuarioId: this.usuarioId
    };
  }

  guardarNota() {
    const tieneTexto = this.notaFormulario.titulo.trim() || this.notaFormulario.contenido.trim();
    const tieneImagen = !!this.imagenPreview;

    if (tieneTexto || tieneImagen) {
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