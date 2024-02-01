import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOficiosSecretariaDto } from './dto/oficios-secretaria.dto';
import { OficiosSecretariaEntity } from './entities/oficios-secretaria.entity';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class OficiosSecretariaService {
  constructor(
    @InjectRepository(OficiosSecretariaEntity)
    private readonly oficioRepository: Repository<OficiosSecretariaEntity>,
  ) {}

  async getAll(): Promise<OficiosSecretariaEntity[]> {
    return await this.oficioRepository.find();
  }

  async getOne(idOficio: number): Promise<OficiosSecretariaEntity> {
    const options: FindOneOptions<OficiosSecretariaEntity> = {
      where: { id_oficios: idOficio },
    };
    return await this.oficioRepository.findOne(options);
  }

  async createOficio(
    oficioNuevo: CreateOficiosSecretariaDto,
  ): Promise<OficiosSecretariaEntity> {
    const nuevo = new OficiosSecretariaEntity();
    nuevo.nombreFirmante = oficioNuevo.nombreFirmante;
    nuevo.apellidoFirmante = oficioNuevo.apellidoFirmante;

    nuevo.fechaRecibido = oficioNuevo.fechaRecibido;
    nuevo.fechaOficio = oficioNuevo.fechaOficio;
    nuevo.organizacionRemitente = oficioNuevo.organizacionRemitente;

    nuevo.archivo = oficioNuevo.archivo;
    nuevo.requerimiento = oficioNuevo.requerimiento;

    nuevo.delegacion = oficioNuevo.delegacion;
    nuevo.prioridad = oficioNuevo.prioridad;
    nuevo.comentario = oficioNuevo.comentario;
    nuevo.estado = oficioNuevo.estado;
    return this.oficioRepository.save(nuevo);
  }

  async updateOficio(
    idOficio: number,
    oficioActualizar: CreateOficiosSecretariaDto,
  ): Promise<OficiosSecretariaEntity> {
    const options: FindOneOptions<OficiosSecretariaEntity> = {
      where: { id_oficios: idOficio },
    };
    const oficioUpdate = await this.oficioRepository.findOne(options);
    oficioUpdate.nombreFirmante = oficioActualizar.nombreFirmante;
    oficioUpdate.apellidoFirmante = oficioActualizar.apellidoFirmante;

    oficioUpdate.fechaRecibido = oficioActualizar.fechaRecibido;
    oficioUpdate.fechaOficio = oficioActualizar.fechaOficio;
    oficioUpdate.organizacionRemitente = oficioActualizar.organizacionRemitente;

    oficioUpdate.archivo = oficioActualizar.archivo;
    oficioUpdate.requerimiento = oficioActualizar.requerimiento;

    oficioUpdate.delegacion = oficioActualizar.delegacion;
    oficioUpdate.prioridad = oficioActualizar.prioridad;
    oficioUpdate.comentario = oficioActualizar.comentario;
    oficioUpdate.estado = oficioActualizar.estado;
    return await this.oficioRepository.save(oficioUpdate);
  }

  async deleteOficio(idOficio: number): Promise<any> {
    return await this.oficioRepository.delete(idOficio);
  }
}
