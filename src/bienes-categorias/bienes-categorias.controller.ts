import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BienesCategoriasService } from './bienes-categorias.service';
import { CreateBienesCategoriaDto } from './dto/create-bienes-categoria.dto';
import { UpdateBienesCategoriaDto } from './dto/update-bienes-categoria.dto';

@ApiTags('bienes-categorias')
@Controller('bienes-categorias')
export class BienesCategoriasController {
  constructor(private readonly bienesCategoriasService: BienesCategoriasService) {}

  @ApiOperation({ summary: 'Registrar Categorias' })
  @ApiResponse({ status: 200, description: 'Elemento creado correctamente' })
  @Post('create') 
  create(@Body() createBienesCategoriaDto: CreateBienesCategoriaDto) {
    return this.bienesCategoriasService.create(createBienesCategoriaDto);
  }

  @ApiOperation({ summary: 'Listar Categorias' })
  @ApiResponse({ status: 200, description: 'Elementos listados correctamente' })
  @Get('all')
  findAll() {
    return this.bienesCategoriasService.findAll();
  }

  @ApiOperation({ summary: 'Buscar Categorias por ID' })
  @ApiResponse({ status: 200, description: 'Elemento encontrado correctamente' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bienesCategoriasService.findOne(+id);
  }

  @ApiOperation({ summary: 'Actualizar Categorias por ID' })
  @ApiResponse({ status: 200, description: 'Elemento actualizado correctamente' })
  @Put(':id')
  updateCategoria(@Param('id') id: string, @Body() updateBienesCategoriaDto: UpdateBienesCategoriaDto) {
    return this.bienesCategoriasService.update(+id, updateBienesCategoriaDto);
  }

  @ApiOperation({ summary: 'Actualizar Categorias por ID' })
  @ApiResponse({ status: 200, description: 'Elemento actualizado correctamente' })
  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateBienesCategoriaDto: UpdateBienesCategoriaDto) {
    return this.bienesCategoriasService.update(+id, updateBienesCategoriaDto);
  }

  @ApiOperation({ summary: 'Eliminar Categorias por ID fisica' })
  @ApiResponse({ status: 200, description: 'Elemento eliminado correctamente' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bienesCategoriasService.remove(+id);
  }

  @ApiOperation({ summary: 'Eliminar Categorias por ID logica' })
  @ApiResponse({ status: 200, description: 'Elemento eliminado correctamente de forma logica' })
  @Delete('softDelete/:id')
  deleteSoftCategoria(@Param('id') id: number): Promise<void> {
    return this.bienesCategoriasService.deleteSoftCategoria(id);
  }

  @ApiOperation({ summary: 'Restaurar Categorias por ID logica' })
  @ApiResponse({ status: 200, description: 'Elemento restaurado correctamente' })
  @Patch('restore/:id')
  restoreCategoria(@Param('id') id: number): Promise<void> {
    return this.bienesCategoriasService.restoreCategoria(id);
  }
}
