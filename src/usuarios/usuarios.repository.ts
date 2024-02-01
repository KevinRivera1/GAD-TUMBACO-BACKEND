import { EntityRepository, Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { NotFoundException } from '@nestjs/common';

@EntityRepository(Usuario)
export class UsuariosRepository extends Repository<Usuario> {
  async findOneByEmail(correo: string): Promise<Usuario> {
    const user: Usuario = await this.findOne({ where: { correo } });

    if (!user) {
      throw new NotFoundException(`User with email ${correo} not found`);
    }
    return user;
  }

  async findOneByResetPasswordToken(
    resetPasswordToken: string,
  ): Promise<Usuario> {
    const user: Usuario = await this.findOne({ where: { resetPasswordToken } });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }
}
