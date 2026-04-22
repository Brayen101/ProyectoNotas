import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { UsuarioDto } from './dto/usuario.dto';
import { UsuarioService } from './usuario.service';

@Controller('usuariocontroller')
export class UsuarioController {
  constructor(private readonly service: UsuarioService) {}

  @Get()
  getAll() {
    return this.service.getAll();
  }

  @Post('save')
  async save(@Body() data: UsuarioDto) {
    return await this.service.save(data);
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.getById(id);
  }

  @Post('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.service.delete(id);
  }
}