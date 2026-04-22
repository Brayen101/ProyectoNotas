import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Nota } from './model/nota.model';
import { NotaDto } from '../usuario/dto/nota.dto';

@Injectable()
export class NotaService {
  constructor(
    @InjectRepository(Nota)
    private readonly notaRepository: Repository<Nota>
  ) {}

  async save(data: NotaDto) {
    try {
      const nota = this.notaRepository.create({
        titulo: data.titulo,
        contenido: data.contenido,
        color: data.color || '#202124',
        usuario: { id: data.usuarioId }
      });
      return await this.notaRepository.save(nota);
    } catch (error) {
      throw new Error(`Error al guardar la nota: ${error.message}`);
    }
  }

  async getAll() {
    return await this.notaRepository.find({ relations: ['usuario'] });
  }

  async getById(id: number) {
    const nota = await this.notaRepository.findOne({
      where: { id },
      relations: ['usuario']
    });
    if (!nota) {
      throw new NotFoundException(`Nota con ID ${id} no encontrada`);
    }
    return nota;
  }

  async getByUsuarioId(usuarioId: number) {
    return await this.notaRepository.find({
      where: { usuario: { id: usuarioId } },
      relations: ['usuario']
    });
  }

  async update(id: number, data: Partial<NotaDto>) {
    await this.notaRepository.update(id, {
      titulo: data.titulo,
      contenido: data.contenido,
      color: data.color
    });
    return await this.getById(id);
  }

  async delete(id: number) {
    const nota = await this.getById(id);
    await this.notaRepository.remove(nota);
    return { message: 'Nota eliminada correctamente', status: 200 };
  }
}
