import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe
} from '@nestjs/common';
import { NotaService } from './nota.service';
import { NotaDto } from '../usuario/dto/nota.dto';

@Controller('notacontroller')
export class NotaController {
  constructor(private readonly notaService: NotaService) {}

  @Post('save')
  async save(@Body() data: NotaDto) {
    return await this.notaService.save(data);
  }

  @Get()
  async getAll() {
    return await this.notaService.getAll();
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return await this.notaService.getById(id);
  }

  @Get('usuario/:usuarioId')
  async getByUsuarioId(@Param('usuarioId', ParseIntPipe) usuarioId: number) {
    return await this.notaService.getByUsuarioId(usuarioId);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<NotaDto>
  ) {
    return await this.notaService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.notaService.delete(id);
  }
}
