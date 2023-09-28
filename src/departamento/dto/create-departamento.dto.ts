import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateDepartamentoDto {

    @IsString()
    @ApiProperty()
    nombre: string;
  
    @IsString()
    @ApiProperty()
    descripcion: string;

}
