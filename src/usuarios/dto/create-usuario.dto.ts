import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  @ApiProperty()
  nombres: string;

  @IsString()
  @ApiProperty()
  apellidos: string;

  @IsString()
  @ApiProperty()
  clave: string;

  @IsNotEmpty()
  @IsEmail()
  correo: string;

  @IsString()
  @ApiProperty()
  identificacion: string;

  @IsString()
  @ApiProperty()
  celular: string;

  @IsInt()
  @ApiProperty()
  id_estado: number;

  @IsInt()
  @ApiProperty()
  id_roles: number;
}
