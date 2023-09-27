import { PartialType } from '@nestjs/swagger';
import { CreateBienesCategoriaDto } from './create-bienes-categoria.dto';

export class UpdateBienesCategoriaDto extends PartialType(CreateBienesCategoriaDto) {}
