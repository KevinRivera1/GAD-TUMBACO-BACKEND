import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBienDto } from './dto/create-bien.dto';
import { UpdateBienDto } from './dto/update-bien.dto';
import { Bienes } from './entities/bienes.entity';

@Injectable()
export class BienesService {

  constructor(
    @InjectRepository(Bienes)
    private readonly bienesRepository: Repository<Bienes>,
  ) { }


  async findAll(): Promise<Bienes[]> {
    //return await this.bienesRepository.find({where : {disponibilidad:false}});
    return await this.bienesRepository.find({relations: ['categorias', 'bienesSolicitud']});
  }


  async create(createBienDto: CreateBienDto) {
    const bienes = this.bienesRepository.create(createBienDto);
    return await this.bienesRepository.save(bienes);
  }


  async findOne(id: number): Promise<Bienes> {
    const bienes = await this.bienesRepository.findOne({
      where: { id_bienes: id },
      relations: ['categorias', 'bienesSolicitud'],
    });
    if (!bienes) throw new NotFoundException(`No se pudo encontrar el Registro de Bienes con el ID: ${id} proporcionado`);
    return bienes;
  }

  async update(id: number, updateBienDto: UpdateBienDto) {
    return await this.bienesRepository.update(id, updateBienDto);
  }

  //* eliminacion fisica
  remove(id: number) {
    return `This action removes a #${id} biene`;
  }

  //* eliminacion logica
  async deleteSoftBien(id : number): Promise<void> {
    await this.bienesRepository.softDelete(id);
  }

  //* restauracion logica
  async restoreBien(id : number): Promise<void> {
    await this.bienesRepository.restore(id);
  }

}
