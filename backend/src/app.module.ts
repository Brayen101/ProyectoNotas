import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from './usuario/usuario.module';
import { Usuario } from './usuario/model/usuario.model';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123', 
      autoLoadEntities: true,        
      database: 'notas_db',    
      entities: [Usuario],
      synchronize: true,      
    }),
    UsuarioModule,
  ],
})
export class AppModule {}