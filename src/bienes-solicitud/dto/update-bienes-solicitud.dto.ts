import { PartialType } from '@nestjs/swagger';
import { CreateBienesSolicitudDto } from './create-bienes-solicitud.dto';

export class UpdateBienesSolicitudDto extends PartialType(CreateBienesSolicitudDto) {}
