import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEstadoDto } from './dto/create-estado.dto';
import { UpdateEstadoDto } from './dto/update-estado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EstadosEntity } from './entities/estado.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EstadosService {
  constructor(
    @InjectRepository(EstadosEntity)
    private readonly estadoRepository: Repository<EstadosEntity>,
  ) {}

  async findAll() {
    //return await this.bienesRepository.find({where : {disponibilidad:false}});
    return await this.estadoRepository.find();
  }

  async create(createestadoDto: CreateEstadoDto) {
    const estados = this.estadoRepository.create(createestadoDto);
    return await this.estadoRepository.save(estados);
  }

  async findOne(id: number): Promise<EstadosEntity> {
    const estados = await this.estadoRepository.findOneBy({ id_estados: id });
    if (!estados)
      throw new NotFoundException(
        'No se pudo encontrar el Registro de estados con el ID proporcionado',
      );
    return estados;
  }

  async update(id: number, updateEstadoDto: UpdateEstadoDto) {
    return await this.estadoRepository.update(id, updateEstadoDto);
  }

  //* eliminacion fisica
  remove(id: number) {
    return `This action removes a #${id} biene`;
  }

  //* eliminacion logica
  async deleteSoftBien(id: number): Promise<void> {
    await this.estadoRepository.softDelete(id);
  }

  //* restauracion logica
  async restoreBien(id: number): Promise<void> {
    await this.estadoRepository.restore(id);
  }

  async deleteEstado(idEstado: number): Promise<any> {
    return await this.estadoRepository.delete(idEstado);
  }
}
