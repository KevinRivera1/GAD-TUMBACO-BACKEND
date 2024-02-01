import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { PresidenciaService } from './presidencia.service';
import { CreatePresidenciaDto } from './dto/create-presidencia.dto';
import { UpdatePresidenciaDto } from './dto/update-presidencia.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('presidencia')
@Controller('presidencia')
export class PresidenciaController {
  constructor(private readonly presidenciaService: PresidenciaService) {}

  @ApiOperation({ summary: 'Registrar Presidencia' })
  @ApiResponse({ status: 200, description: 'Elemento creado correctamente' })
  @Post('create')
  create(@Body() createPresidenciaDto: CreatePresidenciaDto) {
    return this.presidenciaService.create(createPresidenciaDto);
  }

  @ApiOperation({ summary: 'Listar Presidencia' })
  @ApiResponse({ status: 200, description: 'Elementos listados correctamente' })
  @Get('all')
  findAll() {
    return this.presidenciaService.findAll();
  }

  @ApiOperation({ summary: 'Buscar Presidencia por ID' })
  @ApiResponse({
    status: 200,
    description: 'Elemento encontrado correctamente',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.presidenciaService.findOne(+id);
  }

  @ApiOperation({ summary: 'Actualizar Presidencia por ID' })
  @ApiResponse({
    status: 200,
    description: 'Elemento actualizado correctamente',
  })
  @Put('update/:id')
  updatePresidencia(
    @Param('id') id: string,
    @Body() updatePresidenciaDto: UpdatePresidenciaDto,
  ) {
    return this.presidenciaService.update(+id, updatePresidenciaDto);
  }

  @ApiOperation({ summary: 'Actualizar Presidencia por ID' })
  @ApiResponse({
    status: 200,
    description: 'Elemento actualizado correctamente',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePresidenciaDto: UpdatePresidenciaDto,
  ) {
    return this.presidenciaService.update(+id, updatePresidenciaDto);
  }

  @ApiOperation({ summary: 'Eliminar Preidencia por ID fisica' })
  @ApiResponse({ status: 200, description: 'Elemento eliminado correctamente' })
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.presidenciaService.remove(+id);
  }

  @ApiOperation({ summary: 'Eliminar Categorias por ID logica' })
  @ApiResponse({
    status: 200,
    description: 'Elemento eliminado correctamente de forma logica',
  })
  @Delete('softDelete/:id')
  deleteSoftCategoria(@Param('id') id: number): Promise<void> {
    return this.presidenciaService.deleteSoftPresidencia(id);
  }

  @ApiOperation({ summary: 'Restaurar Categorias por ID logica' })
  @ApiResponse({
    status: 200,
    description: 'Elemento restaurado correctamente',
  })
  @Patch('restore/:id')
  restoreCategoria(@Param('id') id: number): Promise<void> {
    return this.presidenciaService.restorePresidencia(id);
  }
}
