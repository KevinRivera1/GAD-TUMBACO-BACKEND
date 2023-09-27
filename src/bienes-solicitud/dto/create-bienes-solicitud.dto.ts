import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsString } from "class-validator";

export class CreateBienesSolicitudDto {
  @IsString()
  @ApiProperty()
  nombreResponsable: string;

  @IsString()
  @ApiProperty()
  apellidoResponsable: string;

  @IsString()
  @ApiProperty()
  destino: string;

  @IsString()
  @ApiProperty()
  movilizacion: string;

  @IsString()
  @ApiProperty()
  duracionEvento: string;

  @IsString()
  @ApiProperty()
  repartidor: string;

  @IsString()
  @ApiProperty()
  receptor: string;

  @IsString()
  @ApiProperty()
  observacion: string;

  @IsBoolean()
  @ApiProperty()
  estado: boolean;
}
