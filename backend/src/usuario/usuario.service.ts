import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { Usuario } from "./model/usuario.model";
import { InjectRepository } from "@nestjs/typeorm";
import { UsuarioDto } from "./dto/usuario.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario)
        private readonly repository: Repository<Usuario>
    ) {}

    async save(data: UsuarioDto) {
        const updateData: any = { ...data };

        if (data.password) {
            updateData.password = await bcrypt.hash(data.password, 12);
        }

        if (data.id && data.id !== 0) {
            await this.repository.update(data.id, updateData);
            return { message: 'Usuario actualizado', status: 200 };
        } else {
            delete updateData.id;
            const nuevo = this.repository.create(updateData);
            return await this.repository.save(nuevo);
        }
    }

    async getAll() {
        return await this.repository.find();
    }


    async getById(id: number) {
        const user = await this.repository.findOneBy({ id });
        if (!user) throw new NotFoundException('Usuario no encontrado');
        return user;
    }


    async delete(id: number) {
        const res = await this.repository.delete(id);
        if (res.affected === 0) throw new NotFoundException('No se pudo eliminar');
        return { message: 'Eliminado correctamente', status: 200 };
    }
    async login(email: string, pass: string) {
 
  const user = await this.repository.findOneBy({ email });
  if (!user) throw new NotFoundException('El correo no existe');

 
  const isMatch = await bcrypt.compare(pass, user.password);
  if (!isMatch) throw new Error('Contraseña incorrecta');

  
  const { password, ...result } = user;
  return result;
}
}