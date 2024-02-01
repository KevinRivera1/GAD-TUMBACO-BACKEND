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
import { ProyectoService } from './proyecto.service';
import { CreateProyectoDto } from './dto/create-proyecto.dto';
import { UpdateProyectoDto } from './dto/update-proyecto.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('proyectos')
@Controller('proyecto')
export class ProyectoController {
  constructor(private readonly proyectoService: ProyectoService) {}

  @ApiOperation({ summary: 'Registrar Proyectos' })
  @ApiResponse({ status: 200, description: 'Elemento creado correctamente' })
  @Post('create')
  create(@Body() createProyectoDto: CreateProyectoDto) {
    return this.proyectoService.create(createProyectoDto);
  }

  @ApiOperation({ summary: 'Listar Proyectos' })
  @ApiResponse({ status: 200, description: 'Elementos listados correctamente' })
  @Get('all')
  findAll() {
    return this.proyectoService.findAll();
  }
  @ApiOperation({ summary: 'Buscar Proyectos por ID' })
  @ApiResponse({
    status: 200,
    description: 'Elemento encontrado correctamente',
  })
  @Get('listarproyecto/:id')
  findOne(@Param('id') id: string) {
    return this.proyectoService.findOne(+id);
  }

  @ApiOperation({ summary: 'Actualizar Proyectos por ID' })
  @ApiResponse({
    status: 200,
    description: 'Elemento actualizado correctamente',
  })
  @Put('update/:id')
  updateProyecto(
    @Param('id') id: string,
    @Body() updateProyectosDto: UpdateProyectoDto,
  ) {
    return this.proyectoService.update(+id, updateProyectosDto);
  }
  @ApiOperation({ summary: 'Actualizar Proyectos por ID' })
  @ApiResponse({
    status: 200,
    description: 'Elemento actualizado correctamente',
  })
  @Patch('update/:id')
  update(
    @Param('id') id: string,
    @Body() updateProyectoDto: UpdateProyectoDto,
  ) {
    return this.proyectoService.update(+id, updateProyectoDto);
  }

  @ApiOperation({ summary: 'Eliminar Proyectos por ID fisica' })
  @ApiResponse({ status: 200, description: 'Elemento eliminado correctamente' })
  @Delete('eliminarproyecto/:id')
  async delete(@Res() response, @Param('id') idproyecto) {
    {
      try {
        const res = await this.proyectoService.deleteProyecto(idproyecto);
        response.status(HttpStatus.OK).json(res);
      } catch {
        return response
          .status(HttpStatus.FORBIDDEN)
          .json({ departamento: 'error en la eliminacion del proyecto' });
      }
    }
  }

  @ApiOperation({ summary: 'Eliminar Proyectos por ID logica' })
  @ApiResponse({
    status: 200,
    description: 'Elemento eliminado correctamente de forma logica',
  })
  @Delete('softDelete/:id')
  deleteSoftCategoria(@Param('id') id: number): Promise<void> {
    return this.proyectoService.deleteSoftProyecto(id);
  }

  @ApiOperation({ summary: 'Restaurar Proyectos por ID logica' })
  @ApiResponse({
    status: 200,
    description: 'Elemento restaurado correctamente',
  })
  @Patch('restore/:id')
  restoreCategoria(@Param('id') id: number): Promise<void> {
    return this.proyectoService.restoreProyecto(id);
  }
}
