import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePresidenciaDto } from './dto/create-presidencia.dto';
import { UpdatePresidenciaDto } from './dto/update-presidencia.dto';
import { Presidencia } from './entities/presidencia.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PresidenciaService {
  constructor(
    @InjectRepository(Presidencia)
    private readonly presidenciaRepository: Repository<Presidencia>,
  ) {}

  async create(createPresidenciaDto: CreatePresidenciaDto) {
    const presidencia = this.presidenciaRepository.create(createPresidenciaDto);
    return await this.presidenciaRepository.save(presidencia);
  }

  async findAll(): Promise<Presidencia[]> {
    return await this.presidenciaRepository.find();
  }

  async findOne(id: number): Promise<Presidencia> {
    const presidencia = await this.presidenciaRepository.findOneBy({
      id_presidencia: id,
    });
    if (!presidencia)
      throw new NotFoundException(
        'No se pudo encontrar el Registro de Bienes con el ID proporcionado',
      );
    return presidencia;
  }

  async update(id: number, updatePresidenciaDto: UpdatePresidenciaDto) {
    return await this.presidenciaRepository.update(id, updatePresidenciaDto);
  }

  //* eliminacion fisica
  async remove(idPresidencia: number): Promise<any> {
    return await this.presidenciaRepository.delete(idPresidencia);
  }

  //* eliminacion logica
  async deleteSoftPresidencia(id: number): Promise<void> {
    await this.presidenciaRepository.softDelete(id);
  }

  //* restauracion logica
  async restorePresidencia(id: number): Promise<void> {
    await this.presidenciaRepository.restore(id);
  }
}
