import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProyectoDto } from './dto/create-proyecto.dto';
import { UpdateProyectoDto } from './dto/update-proyecto.dto';
import { Proyecto } from './entities/proyecto.entity';

@Injectable()
export class ProyectoService {
  restoreProyecto(id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
  deleteSoftProyecto(id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
  ProyectoRepository: any;

  constructor(
    @InjectRepository(Proyecto)
    private readonly proyectoRepository: Repository<Proyecto>,
  ) {}

  async create(createProyectoDto: CreateProyectoDto) {
    const proyecto = this.proyectoRepository.create(createProyectoDto);
    return await this.proyectoRepository.save(proyecto);
  }

  async findAll(): Promise<Proyecto[]> {
    return await this.proyectoRepository.find();
  }

  async findOne(id: number) {
    const proyecto = await this.ProyectoRepository.findOneBy({
      id_proyecto: id,
    });
    if (!proyecto)
      throw new NotFoundException(
        'No se pudo encontrar el Registro de Proyectos con el ID proporcionado',
      );
    return proyecto;
  }

  async update(id: number, updateProyectoDto: UpdateProyectoDto) {
    return await this.proyectoRepository.update(id, updateProyectoDto);
  }

  async remove(id: number) {
    return `This action removes a #${id} proyecto`;
  }

  //* eliminacion logica
  async deleteSoftBien(id: number): Promise<void> {
    await this.proyectoRepository.softDelete(id);
  }

  //* restauracion logica
  async restoreBien(id: number): Promise<void> {
    await this.proyectoRepository.restore(id);
  }

  async deleteProyecto(idproyecto: number): Promise<any> {
    return await this.proyectoRepository.delete(idproyecto);
  }
}
