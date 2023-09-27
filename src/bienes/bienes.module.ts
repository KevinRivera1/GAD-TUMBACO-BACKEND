import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BienesController } from './bienes.controller';
import { BienesService } from './bienes.service';
import { Bienes } from './entities/bienes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bienes])],
  controllers: [BienesController],
  providers: [BienesService],
})
export class BienesModule {}
