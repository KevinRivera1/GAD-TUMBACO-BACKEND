import { PartialType } from '@nestjs/swagger';
import { CreateBienDto } from './create-bien.dto';

export class UpdateBienDto extends PartialType(CreateBienDto) {}
