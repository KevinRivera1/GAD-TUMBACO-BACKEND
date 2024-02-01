import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateEstadoDto {
  @IsString()
  @ApiProperty()
  nombre_estado: string;

  @IsString()
  @ApiProperty()
  acronimo: string;

  @IsString()
  @ApiProperty()
  descripcion_estado: string;
}
