import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateBienesCategoriaDto {
  @IsString()
  @ApiProperty()
  nombre_categoria: string;

  @IsString()
  @ApiProperty()
  descripcion_categoria: string;
}
