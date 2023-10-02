import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDepartamentoDto } from './dto/create-departamento.dto';
import { UpdateDepartamentoDto } from './dto/update-departamento.dto';
import { Departamento } from './entities/departamento.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DepartamentoService {
  constructor(
    @InjectRepository(Departamento)
    private readonly departamentoRepository: Repository<Departamento>,
  ) { }


  async findAll() {
    //return await this.bienesRepository.find({where : {disponibilidad:false}});
    return await this.departamentoRepository.find();
  }


  async create(createdepartamentoDto: CreateDepartamentoDto) {
    const departamentos = this.departamentoRepository.create(createdepartamentoDto);
    return await this.departamentoRepository.save(departamentos);
  }


  async findOne(id: number): Promise<Departamento> {
    const departamentos = await this.departamentoRepository.findOneBy({ id_departamentos: id });
    if (!departamentos) throw new NotFoundException("No se pudo encontrar el Registro de departamentos con el ID proporcionado");
    return departamentos;
  }

  async update(id: number, updateDepartamentoDto: UpdateDepartamentoDto) {
    return await this.departamentoRepository.update(id, updateDepartamentoDto);
  }

  //* eliminacion fisica
  remove(id: number) {
    return `This action removes a #${id} biene`;
  }

  //* eliminacion logica
  async deleteSoftBien(id : number): Promise<void> {
    await this.departamentoRepository.softDelete(id);
  }

  //* restauracion logica
  async restoreBien(id : number): Promise<void> {
    await this.departamentoRepository.restore(id);
  }

  async deleteDepartamento(idDepartamento: number): Promise<any> {
    return await this.departamentoRepository.delete(idDepartamento);
  }

}
