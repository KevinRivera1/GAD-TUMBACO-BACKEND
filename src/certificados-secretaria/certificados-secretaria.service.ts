import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateCertificadosSecretariaDto } from './dto/certificados-secretaria.dto';
import { CertificadosSecretariaEntity } from './entities/certificados-secretaria.entity';

@Injectable()
export class CertificadoService {
  constructor(
    @InjectRepository(CertificadosSecretariaEntity)
    private readonly certificadoRepository: Repository<CertificadosSecretariaEntity>,
  ) {}

  async getAll(): Promise<CertificadosSecretariaEntity[]> {
    return await this.certificadoRepository.find();
  }

  async getOne(idCertificado: number): Promise<CertificadosSecretariaEntity> {
    const options: FindOneOptions<CertificadosSecretariaEntity> = {
      where: { id_certificados: idCertificado },
    };
    return await this.certificadoRepository.findOne(options);
  }

  async createCertificado(
    certificadoNuevo: CreateCertificadosSecretariaDto,
  ): Promise<CertificadosSecretariaEntity> {
    const nuevo = new CertificadosSecretariaEntity();
    nuevo.requerimiento = certificadoNuevo.requerimiento;
    nuevo.responsable = certificadoNuevo.responsable;
    nuevo.fechaRecibido = certificadoNuevo.fechaRecibido;
    nuevo.fechaEmision = certificadoNuevo.fechaEmision;
    nuevo.fechaDevolucion = certificadoNuevo.fechaDevolucion;
    nuevo.comentario = certificadoNuevo.comentario;
    nuevo.cedula = certificadoNuevo.cedula;
    nuevo.servicioBasico = certificadoNuevo.servicioBasico;
    nuevo.escrituras = certificadoNuevo.escrituras;
    nuevo.oficio = certificadoNuevo.oficio;
    return this.certificadoRepository.save(nuevo);
  }

  async updateCertificado(
    idCertificado: number,
    certificadoActualizar: CreateCertificadosSecretariaDto,
  ): Promise<CertificadosSecretariaEntity> {
    const options: FindOneOptions<CertificadosSecretariaEntity> = {
      where: { id_certificados: idCertificado },
    };
    const certificadoUpdate = await this.certificadoRepository.findOne(options);
    certificadoUpdate.requerimiento = certificadoActualizar.requerimiento;
    certificadoUpdate.responsable = certificadoActualizar.responsable;
    certificadoUpdate.fechaRecibido = certificadoActualizar.fechaRecibido;
    certificadoUpdate.fechaEmision = certificadoActualizar.fechaEmision;
    certificadoUpdate.fechaDevolucion = certificadoActualizar.fechaDevolucion;
    certificadoUpdate.comentario = certificadoActualizar.comentario;
    certificadoUpdate.cedula = certificadoActualizar.cedula;
    certificadoUpdate.servicioBasico = certificadoActualizar.servicioBasico;
    certificadoUpdate.escrituras = certificadoActualizar.escrituras;
    certificadoUpdate.oficio = certificadoActualizar.oficio;
    return await this.certificadoRepository.save(certificadoUpdate);
  }

  async deleteCertificado(idCertificado: number): Promise<any> {
    return await this.certificadoRepository.delete(idCertificado);
  }
}
