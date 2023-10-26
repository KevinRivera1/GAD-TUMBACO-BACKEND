import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBienesCategoriaDto } from './dto/create-bienes-categoria.dto';
import { UpdateBienesCategoriaDto } from './dto/update-bienes-categoria.dto';
import { BienesCategoria } from './entities/bienes-categoria.entity';

@Injectable()
export class BienesCategoriasService {

  private categorias: BienesCategoria[] = [];

  constructor(
    @InjectRepository(BienesCategoria)
    private readonly categoriasRepository: Repository<BienesCategoria>,
  ) { }

  async findAll(): Promise<BienesCategoria[]> {
    //return await this.bienesRepository.find({where : {disponibilidad:false}});
    return await this.categoriasRepository.find();
  }

  async create(createBienesCategoriaDto: CreateBienesCategoriaDto) {

    const existingCategoria = await this.categoriasRepository.findOneBy({
      nombre_categoria: createBienesCategoriaDto.nombre_categoria,
    });


    const existingInMemory = this.categorias.find(
      (categoria) => categoria.nombre_categoria === createBienesCategoriaDto.nombre_categoria
    );


    if (existingCategoria || existingInMemory) {
      throw new ConflictException(`La categoría ${createBienesCategoriaDto.nombre_categoria} ya existe`);
    }

    const nuevaCategoria = this.categoriasRepository.create(
      createBienesCategoriaDto
    );
    this.categorias.push(nuevaCategoria);
    return await this.categoriasRepository.save(nuevaCategoria);
  }


  async findOne(id: number): Promise<BienesCategoria> {
    const categorias = await this.categoriasRepository.findOneBy({ id_categorias: id });
    if (!categorias) throw new NotFoundException("No se pudo encontrar el Registro de Bienes con el ID proporcionado");
    return categorias;
  }

  async update(id: number, updateBienesCategoriaDto: UpdateBienesCategoriaDto) {
    //return await this.categoriasRepository.update(id, updateBienesCategoriaDto);

    const categoria = await this.categoriasRepository.findOneBy({ id_categorias: id });
    if (!categoria) throw new NotFoundException("No se pudo encontrar la categoria con el ID proporcionado");

    const existingCategoria = await this.categoriasRepository.findOneBy({
      nombre_categoria: updateBienesCategoriaDto.nombre_categoria,
    });

    const existingInMemory = this.categorias.find(
      (categoria) => categoria.nombre_categoria === updateBienesCategoriaDto.nombre_categoria
    );

    if (existingCategoria || existingInMemory) {
      throw new ConflictException(`La categoría ${updateBienesCategoriaDto.nombre_categoria} ya existe`);
    }

    const editedCategoria = Object.assign(categoria, updateBienesCategoriaDto);
    return await this.categoriasRepository.save(editedCategoria);

  }

  //* eliminacion fisica
  remove(id: number) {
    return `This action removes a #${id} bienesCategoria`;
  }

  //* eliminacion logica
  async deleteSoftCategoria(id: number): Promise<void> {
    await this.categoriasRepository.softDelete(id);
  }

  //* restauracion logica
  async restoreCategoria(id: number): Promise<void> {
    await this.categoriasRepository.restore(id);
  }
}
