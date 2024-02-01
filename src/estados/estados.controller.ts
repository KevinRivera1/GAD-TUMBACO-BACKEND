import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { EstadosService } from './estados.service';
import { CreateEstadoDto } from './dto/create-estado.dto';
import { UpdateEstadoDto } from './dto/update-estado.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('estados')
@Controller('estados')
export class EstadosController {
  constructor(private readonly estadoService: EstadosService) {}

  @ApiOperation({ summary: 'Registrar Estado' })
  @ApiResponse({ status: 200, description: 'Elemento creado correctamente' })
  @Post('crearestado')
  create(@Body() createEstadoDto: CreateEstadoDto) {
    return this.estadoService.create(createEstadoDto);
  }

  @ApiOperation({ summary: 'Listar Estado' })
  @ApiResponse({ status: 200, description: 'Elementos listados correctamente' })
  @Get('listarestado')
  findAll() {
    return this.estadoService.findAll();
  }

  @ApiOperation({ summary: 'Buscar Estado por ID' })
  @ApiResponse({
    status: 200,
    description: 'Elemento encontrado correctamente',
  })
  @Get('listarestado/:id')
  findOne(@Param('id') id: string) {
    return this.estadoService.findOne(+id);
  }

  @ApiOperation({ summary: 'Actualizar Estado por ID' })
  @ApiResponse({
    status: 200,
    description: 'Elemento actualizado correctamente',
  })
  @Put('actualizarestado/:id')
  updateBien(
    @Param('id') id: string,
    @Body() updateEstadoDto: UpdateEstadoDto,
  ) {
    return this.estadoService.update(+id, updateEstadoDto);
  }

  @ApiOperation({ summary: 'Actualizar Estado por ID' })
  @ApiResponse({
    status: 200,
    description: 'Elemento actualizado correctamente',
  })
  @Patch('actualizarestado/:id')
  update(@Param('id') id: string, @Body() updateEstadoDto: UpdateEstadoDto) {
    return this.estadoService.update(+id, updateEstadoDto);
  }

  /* @ApiOperation({ summary: 'Eliminar Estado por ID fisica' })
  @ApiResponse({ status: 200, description: 'Elemento eliminado correctamente' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estadoService.remove(+id);
  } */

  @ApiOperation({ summary: 'Eliminar Estado por ID logica' })
  @ApiResponse({
    status: 200,
    description: 'Elemento eliminado correctamente de forma logica',
  })
  @Delete('eliminarestado/:id')
  async delete(@Res() response, @Param('id') idEstado) {
    {
      try {
        const res = await this.estadoService.deleteEstado(idEstado);
        response.status(HttpStatus.OK).json(res);
      } catch {
        return response
          .status(HttpStatus.FORBIDDEN)
          .json({ estado: 'error en la eliminacion del estado' });
      }
    }
  }

  @ApiOperation({ summary: 'Restaurar Estado por ID logica' })
  @ApiResponse({
    status: 200,
    description: 'Elemento restaurado correctamente',
  })
  @Patch('restoreestado/:id')
  restoreBien(@Param('id') id: number): Promise<void> {
    return this.estadoService.restoreBien(id);
  }
}
