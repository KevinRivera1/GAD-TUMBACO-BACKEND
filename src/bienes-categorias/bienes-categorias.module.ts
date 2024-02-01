import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BienesCategoriasController } from './bienes-categorias.controller';
import { BienesCategoriasService } from './bienes-categorias.service';
import { BienesCategoria } from './entities/bienes-categoria.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BienesCategoria])],
  controllers: [BienesCategoriasController],
  providers: [BienesCategoriasService],
  exports: [TypeOrmModule],
})
export class BienesCategoriasModule {}
