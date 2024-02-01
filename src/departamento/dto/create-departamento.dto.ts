import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CreatePresidenciaDto } from 'src/presidencia/dto/create-presidencia.dto';

export class CreateDepartamentoDto {
  @IsString()
  @ApiProperty()
  nombre: string;

  @IsString()
  @ApiProperty()
  descripcion: string;
}
