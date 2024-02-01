import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateOficiosSecretariaDto {
  @IsString()
  @ApiProperty()
  nombreFirmante: string;

  @IsString()
  @ApiProperty()
  apellidoFirmante: string;

  @IsString()
  @ApiProperty()
  fechaRecibido: Date;

  @IsString()
  @ApiProperty()
  fechaOficio: Date;

  @IsString()
  @ApiProperty()
  organizacionRemitente: string;

  @IsString()
  @ApiProperty()
  archivo: string;

  @IsString()
  @ApiProperty()
  requerimiento: string;

  @IsString()
  @ApiProperty()
  delegacion: string;

  @IsString()
  @ApiProperty()
  prioridad: string;

  @IsString()
  @ApiProperty()
  comentario: string;

  @IsString()
  @ApiProperty()
  estado: string;
}
