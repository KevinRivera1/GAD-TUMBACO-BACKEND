import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsInt, IsNumber, IsString, Min } from "class-validator";

export class CreateBienDto {
  @IsString()
  @ApiProperty()
  responsable_bien: string;

  @IsString()
  @ApiProperty()
  nombre_bien: string;

  @IsString()
  @ApiProperty()
  marca: string;

  @IsString()
  @ApiProperty()
  serie: string;

  @IsString()
  @ApiProperty()
  detalle: string;

  @IsNumber()
  @ApiProperty()
  @Min(0)
  @IsInt()
  stock: number;

  @IsBoolean()
  @ApiProperty()
  disponibilidad: boolean;
}
