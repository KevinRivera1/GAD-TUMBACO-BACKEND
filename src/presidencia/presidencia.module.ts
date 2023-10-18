import { Module } from '@nestjs/common';
import { PresidenciaService } from './presidencia.service';
import { PresidenciaController } from './presidencia.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Presidencia } from './entities/presidencia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Presidencia])],
  controllers: [PresidenciaController],
  providers: [PresidenciaService],
})
export class PresidenciaModule {}
