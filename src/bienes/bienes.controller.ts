import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BienesService } from './bienes.service';
import { CreateBienDto } from './dto/create-bien.dto';
import { UpdateBienDto } from './dto/update-bien.dto';

@ApiTags('bienes')
@Controller('bienes')
export class BienesController {
  constructor(private readonly bienesService: BienesService) {}

  @ApiOperation({ summary: 'Registrar Bienes' })
  @ApiResponse({ status: 200, description: 'Elemento creado correctamente' })
  @Post('create')
  create(@Body() createBienDto: CreateBienDto) {
    return this.bienesService.create(createBienDto);
  }

  @ApiOperation({ summary: 'Listar Bienes' })
  @ApiResponse({ status: 200, description: 'Elementos listados correctamente' })
  @Get('all')
  findAll(){
    return this.bienesService.findAll();
  }

  @ApiOperation({ summary: 'Buscar Bienes por ID' })
  @ApiResponse({ status: 200, description: 'Elemento encontrado correctamente' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bienesService.findOne(+id);
  }


  @ApiOperation({ summary: 'Actualizar Bienes por ID' })
  @ApiResponse({ status: 200, description: 'Elemento actualizado correctamente' })
  @Put(':id')
  updateBien(@Param('id') id: string, @Body() updateBienDto: UpdateBienDto) {
    return this.bienesService.update(+id, updateBienDto);
  }

  @ApiOperation({ summary: 'Actualizar Bienes por ID' })
  @ApiResponse({ status: 200, description: 'Elemento actualizado correctamente' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBienDto: UpdateBienDto) {
    return this.bienesService.update(+id, updateBienDto);
  }

  @ApiOperation({ summary: 'Eliminar Bienes por ID fisica' })
  @ApiResponse({ status: 200, description: 'Elemento eliminado correctamente' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bienesService.remove(+id);
  }

  @ApiOperation({ summary: 'Eliminar Bienes por ID logica' })
  @ApiResponse({ status: 200, description: 'Elemento eliminado correctamente de forma logica' })
  @Delete('softDelete/:id')
  deleteSoftBien(@Param('id') id: number): Promise<void> {
    return this.bienesService.deleteSoftBien(id);
  }

  @ApiOperation({ summary: 'Restaurar Bienes por ID logica' })
  @ApiResponse({ status: 200, description: 'Elemento restaurado correctamente' })
  @Patch('restore/:id')
  restoreBien(@Param('id') id: number): Promise<void> {
    return this.bienesService.restoreBien(id);
  }


}
