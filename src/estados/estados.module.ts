import { Module } from '@nestjs/common';
import { EstadosService } from './estados.service';
import { EstadosController } from './estados.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstadosEntity } from './entities/estado.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EstadosEntity])],
  controllers: [EstadosController],
  providers: [EstadosService],
})
export class EstadosModule {}
