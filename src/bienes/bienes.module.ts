import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BienesCategoriasModule } from 'src/bienes-categorias/bienes-categorias.module';
import { BienesCategoriasService } from 'src/bienes-categorias/bienes-categorias.service';
import { BienesController } from './bienes.controller';
import { BienesService } from './bienes.service';
import { Bienes } from './entities/bienes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bienes]),BienesCategoriasModule],
  controllers: [BienesController],
  providers: [BienesService,BienesCategoriasService],
})
export class BienesModule {}
