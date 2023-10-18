import { Module } from '@nestjs/common';
import { OficiosSecretariaService } from './oficios-secretaria.service';
import { OficiosSecretariaController } from './oficios-secretaria.controller';
import { OficiosSecretariaEntity } from './entities/oficios-secretaria.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([OficiosSecretariaEntity])],
  controllers: [OficiosSecretariaController],
  providers: [OficiosSecretariaService],
})
export class OficiosSecretariaModule {}
