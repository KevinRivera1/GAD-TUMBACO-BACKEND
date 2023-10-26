import { PartialType } from '@nestjs/swagger';
import { CreatePresidenciaDto } from './create-presidencia.dto';

export class UpdatePresidenciaDto extends PartialType(CreatePresidenciaDto) {}
