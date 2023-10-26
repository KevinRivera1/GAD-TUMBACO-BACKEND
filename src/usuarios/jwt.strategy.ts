import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Usuario } from './entities/usuario.entity';
import { UsuariosRepository } from './usuarios.repository';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UsuariosRepository)
    private usuariosRepository: UsuariosRepository,
  ) {
    super({
      secretOrKey: 'super-secret',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<Usuario> {
    const { correo } = payload;
    const user = this.usuariosRepository.findOneByEmail(correo);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
