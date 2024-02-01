import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import * as jwt from 'jsonwebtoken';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { RequestResetPasswordDto } from './dto/reset-password.dto';
import { ResetPasswordDto } from './dto/validated-password.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EstadosEntity } from 'src/estados/entities/estado.entity';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import moment from 'moment';

@ApiTags('usuarios')
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.usuariosService.findByEmail(loginDto.correo);
    if (user) {
      const isPasswordValid = await bcrypt.compare(loginDto.clave, user.clave);
      if (isPasswordValid) {
        const payload = {
          username: user.correo,
          sub: user.clave,
          rol: user.rol,
        };
        const token = this.generateJwtToken(payload);
        return { token };
      }
    }
    throw new HttpException(
      'Credenciales incorrectas',
      HttpStatus.UNAUTHORIZED,
    );
  }
  private generateJwtToken(payload: any): string {
    return jwt.sign(payload, 'tu_secreto_secreto', { expiresIn: '1h' });
  }

  @Patch('/request-reset-password')
  requestResetPaswword(
    @Body() requestResetPasswordDto: RequestResetPasswordDto,
  ): Promise<void> {
    return this.usuariosService.requestResetPassword(requestResetPasswordDto);
  }

  @Patch('/reset-password')
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto): Promise<void> {
    return this.usuariosService.resetPassword(resetPasswordDto);
  }

  @ApiOperation({ summary: 'Registrar Usuarios' })
  @ApiResponse({ status: 200, description: 'Elemento creado correctamente' })
  @Post('crearusuario')
  async create(@Body() createUsuarioDto: CreateUsuarioDto) {
    try {
      const { clave, correo, ...userData } = createUsuarioDto;
      const validatedUsuario = await this.usuariosService.findByEmail(correo);
      if (validatedUsuario) {
        return {
          error: 'El correo electrónico ya está en uso',
          status: HttpStatus.CONFLICT,
        };
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(clave, saltRounds);

      const newUser = {
        ...userData,
        correo,
        clave: hashedPassword,
      };

      const user = await this.usuariosService.create(newUser);
      return {
        message: 'Usuario creado exitosamente',
        user,
        status: HttpStatus.CREATED,
      };
    } catch (error) {
      return {
        error: 'Error al crear el usuario',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  @ApiOperation({ summary: 'Listar Usuarios' })
  @ApiResponse({ status: 200, description: 'Elementos listados correctamente' })
  @Get('listarusuario')
  findAll() {
    return this.usuariosService.findAll();
  }

  @ApiOperation({ summary: 'Buscar Usuarios por ID' })
  @ApiResponse({
    status: 200,
    description: 'Elemento encontrado correctamente',
  })
  @Get('listarusuario/:id')
  findOne(@Param('id') id: string) {
    return this.usuariosService.findOne(+id);
  }

  @ApiOperation({ summary: 'Actualizar Usuarios por ID' })
  @ApiResponse({
    status: 200,
    description: 'Elemento actualizado correctamente',
  })
  @Put('actualizarusuario/:id')
  updateBien(
    @Param('id') id: string,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
  ) {
    return this.usuariosService.update(+id, updateUsuarioDto);
  }

  @ApiOperation({ summary: 'Actualizar Usuarios por ID' })
  @ApiResponse({
    status: 200,
    description: 'Elemento actualizado correctamente',
  })
  @Patch('actualizarusuario/:id')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.update(+id, updateUsuarioDto);
  }

  /* @ApiOperation({ summary: 'Eliminar Usuarios por ID fisica' })
  @ApiResponse({ status: 200, description: 'Elemento eliminado correctamente' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuariosService.remove(+id);
  } */

  @ApiOperation({ summary: 'Eliminar Usuarios por ID logica' })
  @ApiResponse({
    status: 200,
    description: 'Elemento eliminado correctamente de forma logica',
  })
  @Delete('eliminarusuario/:id')
  async delete(@Res() response, @Param('id') idUsuario) {
    {
      try {
        const res = await this.usuariosService.deleteUsuario(idUsuario);
        response.status(HttpStatus.OK).json(res);
      } catch {
        return response
          .status(HttpStatus.FORBIDDEN)
          .json({ usuario: 'error en la eliminacion del usuario' });
      }
    }
  }

  @ApiOperation({ summary: 'Restaurar Usuarios por ID logica' })
  @ApiResponse({
    status: 200,
    description: 'Elemento restaurado correctamente',
  })
  @Patch('restoreusuario/:id')
  restoreBien(@Param('id') id: number): Promise<void> {
    return this.usuariosService.restoreBien(id);
  }
}
