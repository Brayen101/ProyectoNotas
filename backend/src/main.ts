import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // 1. Esto permite que el Frontend se conecte sin bloqueos
  app.enableCors(); 
  
  // 2. Esto hace que las rutas empiecen con /api/v1 (como pide tu tarea)
  app.setGlobalPrefix('api/v1'); 

  await app.listen(3000);
}
bootstrap();