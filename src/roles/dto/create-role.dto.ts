import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @ApiProperty()
  nombre: string;

  @IsString()
  @ApiProperty()
  descripcion: string;
}
