import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class LoginDto {

  
    @IsString()
    @ApiProperty()
    clave: string;
  
    @IsString()
    @ApiProperty()
    correo: string;
  

  }