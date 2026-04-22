import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

export class UsuarioDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'El email es obligatorio' })
  @IsEmail({}, { message: 'Email no válido' })
  email: string;

  // CAMBIO: El password NO debe ser opcional en el registro
  @IsNotEmpty({ message: 'La contraseña es obligatoria' }) 
  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;

  @IsNotEmpty({ message: 'La fecha de nacimiento es obligatoria' })
  @IsString()
  fecha_nacimiento: string;
}