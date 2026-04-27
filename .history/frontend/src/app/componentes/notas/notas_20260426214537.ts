import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotasService, Nota } from '../../core/services/notas.service';

interface ChecklistItem {
  texto: string;
  hecho: boolean;
}

interface NotaCard {
  id?: number;
  titulo: string;
  contenido: string;
  imagen?: string;
  checklist: ChecklistItem[];
  etiquetas: string[];
  seleccionada: boolean;
  fijada: boolean;
  archivada: boolean;
}

@Component({
  selector: 'app-notas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './notas.html',
  styleUrl: './notas.css'
})
export class NotasComponent implements OnInit {
  estaEditando = false;
  modoEditor: 'nota' | 'checklist' | 'dibujo' = 'nota';
  horaEditado = '';
  notas: Nota[] = [];
  tarjetas: NotaCard[] = [];
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

  get tarjetasVisibles(): NotaCard[] {
    return this.tarjetas.filter((t) => !t.archivada);
  }

  cargarNotas() {
    this.notasService.getByUsuarioId(this.usuarioId).subscribe(
      (data: Nota[]) => {
        this.notas = data;
        this.tarjetas = data.length > 0 ? data.map((n) => this.mapearNotaATarjeta(n)) : this.getTarjetasMock();
      },
      (error) => {
        console.error('Error al cargar notas:', error);
        this.tarjetas = this.getTarjetasMock();
      }
    );
  }

  expandir(modo: 'nota' | 'checklist' | 'dibujo' = 'nota') {
    this.modoEditor = modo;
    this.estaEditando = true;
    if (modo === 'checklist' && !this.notaFormulario.contenido.trim()) {
      this.notaFormulario.contenido = '☐ ';
    }
    if (modo === 'dibujo' && !this.notaFormulario.contenido.trim()) {
      this.notaFormulario.contenido = '[Dibujo] ';
    }
    this.actualizarHoraEdicion();
  }

  cerrar() {
    this.estaEditando = false;
    this.modoEditor = 'nota';
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
          this.tarjetas.unshift(this.mapearNotaATarjeta(nota));
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

  toggleSeleccion(tarjeta: NotaCard) {
    tarjeta.seleccionada = !tarjeta.seleccionada;
  }

  togglePin(tarjeta: NotaCard) {
    tarjeta.fijada = !tarjeta.fijada;
  }

  toggleArchivo(tarjeta: NotaCard) {
    tarjeta.archivada = !tarjeta.archivada;
  }

  toggleChecklistItem(tarjeta: NotaCard, index: number) {
    const item = tarjeta.checklist[index];
    if (!item) return;
    item.hecho = !item.hecho;
  }

  private mapearNotaATarjeta(nota: Nota): NotaCard {
    const checklist = this.parseChecklist(nota.contenido || '');
    return {
      id: nota.id,
      titulo: nota.titulo,
      contenido: checklist.length > 0 ? '' : (nota.contenido || ''),
      checklist,
      etiquetas: [],
      seleccionada: false,
      fijada: false,
      archivada: false,
    };
  }

  private parseChecklist(contenido: string): ChecklistItem[] {
    const lineas = contenido
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    if (lineas.length === 0) return [];

    const esChecklist = lineas.every((l) => /^(\[ ?\]|\[x\]|☐|☑|✓)/i.test(l));
    if (!esChecklist) return [];

    return lineas.map((l) => {
      const hecho = /^(\[x\]|☑|✓)/i.test(l);
      const texto = l.replace(/^(\[ ?\]|\[x\]|☐|☑|✓)\s*/i, '').trim();
      return { texto, hecho };
    });
  }

  private getTarjetasMock(): NotaCard[] {
    return [
      {
        titulo: 'asdasd',
        contenido: 'sdasda',
        checklist: [],
        etiquetas: [],
        seleccionada: false,
        fijada: false,
        archivada: false,
      },
      {
        titulo: 'Dibujos',
        contenido: '',
        imagen: 'https://upload.wikimedia.org/wikipedia/en/a/aa/Bart_Simpson_200px.png',
        checklist: [],
        etiquetas: ['Serie animada'],
        seleccionada: false,
        fijada: false,
        archivada: false,
      },
      {
        titulo: 'Compra de PC',
        contenido: '',
        checklist: [
          { texto: 'Monitor 24', hecho: false },
          { texto: 'CPU', hecho: false },
          { texto: 'TECLADO', hecho: false },
          { texto: 'MOUSE', hecho: false },
          { texto: 'PARLANTES', hecho: false },
        ],
        etiquetas: [],
        seleccionada: false,
        fijada: false,
        archivada: false,
      },
      {
        titulo: '',
        contenido: '',
        checklist: [{ texto: 'lectura', hecho: false }],
        etiquetas: [],
        seleccionada: false,
        fijada: false,
        archivada: false,
      },
    ];
  }
}