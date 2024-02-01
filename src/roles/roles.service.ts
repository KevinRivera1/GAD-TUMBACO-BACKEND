import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolesEntity } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RolesEntity)
    private readonly rolRepository: Repository<RolesEntity>,
  ) {}

  async findAll() {
    //return await this.bienesRepository.find({where : {disponibilidad:false}});
    return await this.rolRepository.find();
  }

  async create(createrolesDto: CreateRoleDto) {
    const roles = this.rolRepository.create(createrolesDto);
    return await this.rolRepository.save(roles);
  }

  async findOne(id: number): Promise<RolesEntity> {
    const roles = await this.rolRepository.findOneBy({ id_roles: id });
    if (!roles)
      throw new NotFoundException(
        'No se pudo encontrar el Registro de roles con el ID proporcionado',
      );
    return roles;
  }

  async update(id: number, updateRolesDto: UpdateRoleDto) {
    return await this.rolRepository.update(id, updateRolesDto);
  }

  //* eliminacion fisica
  remove(id: number) {
    return `This action removes a #${id} biene`;
  }

  //* eliminacion logica
  async deleteSoftBien(id: number): Promise<void> {
    await this.rolRepository.softDelete(id);
  }

  //* restauracion logica
  async restoreBien(id: number): Promise<void> {
    await this.rolRepository.restore(id);
  }

  async deleteRoles(idRoles: number): Promise<any> {
    return await this.rolRepository.delete(idRoles);
  }
}
