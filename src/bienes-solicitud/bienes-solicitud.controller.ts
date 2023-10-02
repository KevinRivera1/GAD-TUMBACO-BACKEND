import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BienesSolicitudService } from './bienes-solicitud.service';
import { CreateBienesSolicitudDto } from './dto/create-bienes-solicitud.dto';
import { UpdateBienesSolicitudDto } from './dto/update-bienes-solicitud.dto';

@ApiTags('bienes-solicitud')
@Controller('bienes-solicitud')
export class BienesSolicitudController {
  constructor(private readonly bienesSolicitudService: BienesSolicitudService) {}

  @ApiOperation({ summary: 'Crear un nuevo registro de bienes-solicitud' })
  @ApiResponse({ status: 200, description: 'Registro creado correctamente.'})
  @Post('create')
  create(@Body() createBienesSolicitudDto: CreateBienesSolicitudDto) {
    return this.bienesSolicitudService.create(createBienesSolicitudDto);
  }

  @ApiOperation({ summary: 'Obtener todos los registros de bienes-solicitud' })
  @ApiResponse({ status: 200, description: 'Todos los registros de bienes-solicitud.'})
  @Get('all')
  findAll() {
    return this.bienesSolicitudService.findAll();
  }

  @ApiOperation({ summary: 'Obtener un registro de bienes-solicitud' })
  @ApiResponse({ status: 200, description: 'Un registro de bienes-solicitud.'})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bienesSolicitudService.findOne(+id);
  }


  @ApiOperation({ summary: 'Actualizar un registro de bienes-solicitud' })
  @ApiResponse({ status: 200, description: 'Registro actualizado correctamente.'})
  @Put('update/:id')
  updateSolicitud(@Param('id') id: string, @Body() updateBienesSolicitudDto: UpdateBienesSolicitudDto) {
    return this.bienesSolicitudService.update(+id, updateBienesSolicitudDto);
  }

  @ApiOperation({ summary: 'Actualizar un registro de bienes-solicitud' })
  @ApiResponse({ status: 200, description: 'Registro actualizado correctamente.'})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBienesSolicitudDto: UpdateBienesSolicitudDto) {
    return this.bienesSolicitudService.update(+id, updateBienesSolicitudDto);
  }

  @ApiOperation({ summary: 'Eliminar un registro de bienes-solicitud' })
  @ApiResponse({ status: 200, description: 'Registro eliminado correctamente.'})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bienesSolicitudService.remove(+id);
  }


  @ApiOperation({ summary: 'Eliminado logico de un registro de bienes-solicitud' })
  @ApiResponse({ status: 200, description: 'Registro eliminado logicamente de forma correcta.'})
  @Delete('softDelete/:id')
  async softDeleteSolicitud(@Param('id') id: number):Promise<void> {
    await this.bienesSolicitudService.deleteSolicitud(id);
  }


  @ApiOperation({ summary: 'Restauracion logica de un registro de bienes-solicitud' })
  @ApiResponse({ status: 200, description: 'Registro restaurado logicamente de forma correcta.'})
  @Patch('restore/:id')
  async restoreSolicitud(@Param('id') id: number):Promise<void> {
    await this.bienesSolicitudService.restoreSolicitud(id);
  }


}
