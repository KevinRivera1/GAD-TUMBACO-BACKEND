import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString } from 'class-validator';

export class CreateProyectoDto {
  @IsString()
  @ApiProperty()
  responsable: string;

  @IsString()
  @ApiProperty()
  categoria: string;

  @IsString()
  @ApiProperty()
  producto: string;

  @IsString()
  @ApiProperty()
  marca: string;

  @IsString()
  @ApiProperty()
  serial: string;

  @IsString()
  @ApiProperty()
  detalle: string;

  @IsString()
  @ApiProperty()
  imagen: string;
}
