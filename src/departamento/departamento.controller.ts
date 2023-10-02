import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Res, HttpStatus } from '@nestjs/common';
import { DepartamentoService } from './departamento.service';
import { CreateDepartamentoDto } from './dto/create-departamento.dto';
import { UpdateDepartamentoDto } from './dto/update-departamento.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('departamentos')
@Controller('departamentos')
export class DepartamentoController {
  constructor(private readonly departamentoService: DepartamentoService) {}

  @ApiOperation({ summary: 'Registrar Departamento' })
  @ApiResponse({ status: 200, description: 'Elemento creado correctamente' })
  @Post('creardepartamento')
  create(@Body() createDepartamentoDto: CreateDepartamentoDto) {
    return this.departamentoService.create(createDepartamentoDto);
  }

  @ApiOperation({ summary: 'Listar Departamento' })
  @ApiResponse({ status: 200, description: 'Elementos listados correctamente' })
  @Get('listardepartamento')
  findAll(){
    return this.departamentoService.findAll();
  }

  @ApiOperation({ summary: 'Buscar Departamento por ID' })
  @ApiResponse({ status: 200, description: 'Elemento encontrado correctamente' })
  @Get('listardepartamento/:id')
  findOne(@Param('id') id: string) {
    return this.departamentoService.findOne(+id);
  }


  @ApiOperation({ summary: 'Actualizar Departamento por ID' })
  @ApiResponse({ status: 200, description: 'Elemento actualizado correctamente' })
  @Put('actualizardepartamento/:id')
  updateBien(@Param('id') id: string, @Body() updateDepartamentoDto: UpdateDepartamentoDto) {
    return this.departamentoService.update(+id, updateDepartamentoDto);
  }

  @ApiOperation({ summary: 'Actualizar Departamento por ID' })
  @ApiResponse({ status: 200, description: 'Elemento actualizado correctamente' })
  @Patch('actualizardepartamento/:id')
  update(@Param('id') id: string, @Body() updateDepartamentoDto: UpdateDepartamentoDto) {
    return this.departamentoService.update(+id, updateDepartamentoDto);
  }

  /* @ApiOperation({ summary: 'Eliminar Departamento por ID fisica' })
  @ApiResponse({ status: 200, description: 'Elemento eliminado correctamente' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.departamentoService.remove(+id);
  } */

  @ApiOperation({ summary: 'Eliminar Departamento por ID logica' })
  @ApiResponse({ status: 200, description: 'Elemento eliminado correctamente de forma logica' })
  @Delete('eliminardepartamento/:id')
  async delete(@Res() response, @Param('id') idDepartamento) {
    {
      try {
        const res = await this.departamentoService.deleteDepartamento(idDepartamento);
        response.status(HttpStatus.OK).json(res);
      } catch {
        return response
          .status(HttpStatus.FORBIDDEN)
          .json({ departamento: 'error en la eliminacion del departamento' });
      }
    }
  }

  @ApiOperation({ summary: 'Restaurar Departamento por ID logica' })
  @ApiResponse({ status: 200, description: 'Elemento restaurado correctamente' })
  @Patch('restoredepartamento/:id')
  restoreBien(@Param('id') id: number): Promise<void> {
    return this.departamentoService.restoreBien(id);
  }
}
