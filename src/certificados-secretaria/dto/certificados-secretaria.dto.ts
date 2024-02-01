import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCertificadosSecretariaDto {
  @IsString()
  @ApiProperty()
  requerimiento: string;

  @IsString()
  @ApiProperty()
  responsable: string;

  @IsString()
  @ApiProperty()
  fechaRecibido: Date;

  @IsString()
  @ApiProperty()
  fechaEmision: Date;

  @IsString()
  @ApiProperty()
  fechaDevolucion: Date;

  @IsString()
  @ApiProperty()
  comentario: string;

  @IsString()
  @ApiProperty()
  cedula: string;

  @IsString()
  @ApiProperty()
  servicioBasico: string;

  @IsString()
  @ApiProperty()
  escrituras: string;

  @IsString()
  @ApiProperty()
  oficio: string;
}
