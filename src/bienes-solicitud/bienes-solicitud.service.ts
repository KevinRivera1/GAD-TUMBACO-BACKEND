import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBienesSolicitudDto } from './dto/create-bienes-solicitud.dto';
import { UpdateBienesSolicitudDto } from './dto/update-bienes-solicitud.dto';
import { BienesSolicitud } from './entities/bienes-solicitud.entity';


@Injectable()
export class BienesSolicitudService {

  constructor(
    @InjectRepository(BienesSolicitud)
    private readonly bienesSolicitudRepository: Repository<BienesSolicitud>,
  ) { }

  async create(createBienesSolicitudDto: CreateBienesSolicitudDto) {
    const bienesSolicitud = this.bienesSolicitudRepository.create(createBienesSolicitudDto);
    return await this.bienesSolicitudRepository.save(bienesSolicitud);
  }

  async findAll() {
     return await this.bienesSolicitudRepository.find({relations: ['bienes']}); 
  }

  async findOne(id: number) {
    const bienesSolicitud = await this.bienesSolicitudRepository.findOne({
      where: { id_solicitud_bienes: id },
      relations: ['bienes'],
    });
    
    if (!bienesSolicitud) throw new NotFoundException("No se pudo encontrar el Registro de Bienes con el ID proporcionado");
    return bienesSolicitud;
  }

  async update(id: number, updateBienesSolicitudDto: UpdateBienesSolicitudDto) {
    return await this.bienesSolicitudRepository.update(id, updateBienesSolicitudDto);
  }

  //* eliminacion fisica
  remove(id: number) {
    return `This action removes a #${id} bienesSolicitud`;
  }


  //* eliminacion logica
  async deleteSolicitud(id: number):Promise<void> {
    await this.bienesSolicitudRepository.softDelete(id);
  }

  //* restauracion logica
  async restoreSolicitud(id: number):Promise<void> {
    await this.bienesSolicitudRepository.restore(id);
  }

}
