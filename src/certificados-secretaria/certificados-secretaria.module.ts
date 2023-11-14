import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CertificadoController } from './certificados-secretaria.controller';
import { CertificadoService } from './certificados-secretaria.service';
import { CertificadosSecretariaEntity } from './entities/certificados-secretaria.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CertificadosSecretariaEntity])],
  controllers: [CertificadoController],
  providers: [CertificadoService],
})
export class CertificadosSecretariaModule { }
