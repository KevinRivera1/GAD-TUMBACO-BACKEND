import { Module } from '@nestjs/common';
import { CertificadoService } from './certificados-secretaria.service';
import { CertificadoController } from './certificados-secretaria.controller';
import { CertificadosSecretariaEntity } from './entities/certificados-secretaria.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CertificadosSecretariaEntity])],
  controllers: [CertificadoController],
  providers: [CertificadoService],
})
export class CertificadosSecretariaModule {}
