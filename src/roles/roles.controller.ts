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
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @ApiOperation({ summary: 'Registrar Roles' })
  @ApiResponse({ status: 200, description: 'Elemento creado correctamente' })
  @Post('crearroles')
  create(@Body() createRolesDto: CreateRoleDto) {
    return this.rolesService.create(createRolesDto);
  }

  @ApiOperation({ summary: 'Listar Roles' })
  @ApiResponse({ status: 200, description: 'Elementos listados correctamente' })
  @Get('listarroles')
  findAll() {
    return this.rolesService.findAll();
  }

  @ApiOperation({ summary: 'Buscar Roles por ID' })
  @ApiResponse({
    status: 200,
    description: 'Elemento encontrado correctamente',
  })
  @Get('listarroles/:id')
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(+id);
  }

  @ApiOperation({ summary: 'Actualizar Roles por ID' })
  @ApiResponse({
    status: 200,
    description: 'Elemento actualizado correctamente',
  })
  @Put('actualizarroles/:id')
  updateBien(@Param('id') id: string, @Body() updateRolesDto: UpdateRoleDto) {
    return this.rolesService.update(+id, updateRolesDto);
  }

  @ApiOperation({ summary: 'Actualizar Roles por ID' })
  @ApiResponse({
    status: 200,
    description: 'Elemento actualizado correctamente',
  })
  @Patch('actualizarroles/:id')
  update(@Param('id') id: string, @Body() updateRolesDto: UpdateRoleDto) {
    return this.rolesService.update(+id, updateRolesDto);
  }

  /* @ApiOperation({ summary: 'Eliminar Roles por ID fisica' })
  @ApiResponse({ status: 200, description: 'Elemento eliminado correctamente' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolesService.remove(+id);
  } */

  @ApiOperation({ summary: 'Eliminar Roles por ID logica' })
  @ApiResponse({
    status: 200,
    description: 'Elemento eliminado correctamente de forma logica',
  })
  @Delete('eliminarroles/:id')
  async delete(@Res() response, @Param('id') idRoles) {
    {
      try {
        const res = await this.rolesService.deleteRoles(idRoles);
        response.status(HttpStatus.OK).json(res);
      } catch {
        return response
          .status(HttpStatus.FORBIDDEN)
          .json({ roles: 'error en la eliminacion del roles' });
      }
    }
  }

  @ApiOperation({ summary: 'Restaurar Roles por ID logica' })
  @ApiResponse({
    status: 200,
    description: 'Elemento restaurado correctamente',
  })
  @Patch('restoreroles/:id')
  restoreBien(@Param('id') id: number): Promise<void> {
    return this.rolesService.restoreBien(id);
  }
}
