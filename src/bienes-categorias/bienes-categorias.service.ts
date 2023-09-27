import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateBienesCategoriaDto } from './dto/create-bienes-categoria.dto';
import { UpdateBienesCategoriaDto } from './dto/update-bienes-categoria.dto';
import { BienesCategoria } from './entities/bienes-categoria.entity';

@Injectable()
export class BienesCategoriasService {
  
  constructor(
    @InjectRepository(BienesCategoria)
    private readonly categoriasRepository: Repository<BienesCategoria>,
  ) { }

  async findAll() {
    //return await this.bienesRepository.find({where : {disponibilidad:false}});
    return await this.categoriasRepository.find();
  }
  
  async create(createBienesCategoriaDto: CreateBienesCategoriaDto) {
    const categorias = this.categoriasRepository.create(createBienesCategoriaDto);
    return await this.categoriasRepository.save(categorias);
  }

  async findOne(id: number): Promise<BienesCategoria> {
    const categorias = await this.categoriasRepository.findOneBy({ id_categorias: id });
    if (!categorias) throw new NotFoundException("No se pudo encontrar el Registro de Bienes con el ID proporcionado");
    return categorias;
  }

  async update(id: number, updateBienesCategoriaDto: UpdateBienesCategoriaDto) {
    return await this.categoriasRepository.update(id, updateBienesCategoriaDto);
  }

  //* eliminacion fisica
  remove(id: number) {
    return `This action removes a #${id} bienesCategoria`;
  }

  //* eliminacion logica
  async deleteSoftCategoria(id : number): Promise<void> {
    await this.categoriasRepository.softDelete(id);
  }

  //* restauracion logica
  async restoreCategoria(id : number): Promise<void> {
    await this.categoriasRepository.restore(id);
  }
}
