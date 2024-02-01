import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class CreatePresidenciaDto {
  @IsString()
  @ApiProperty()
  nombre_usuario: string;

  @IsString()
  @ApiProperty()
  correo_electronico: string;

  @IsString()
  @ApiProperty()
  contrasenia: string;

  @IsString()
  @ApiProperty()
  departamento: string;

  @IsBoolean()
  @ApiProperty()
  estado: boolean;
}
