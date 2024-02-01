import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @ApiProperty()
  clave: string;

  @IsString()
  @ApiProperty()
  correo: string;

  @IsInt()
  @ApiProperty()
  id_roles: number;
}
