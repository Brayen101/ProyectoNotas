import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Usuario } from "../usuario/model/usuario.model";

@Entity()
export class Nota {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  titulo!: string;

  @Column({ type: 'text' })
  contenido!: string;

  @Column({ default: '#202124' }) 
  color!: string;

  @ManyToOne(() => Usuario, (usuario) => usuario.id)
  usuario!: Usuario;
}