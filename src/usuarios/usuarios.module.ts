import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { Usuario } from './entities/usuario.entity';
import { EstadosEntity } from 'src/estados/entities/estado.entity';
import { RolesEntity } from 'src/roles/entities/role.entity';
import { UsuariosRepository } from './usuarios.repository';
import { JwtStrategy } from './jwt.strategy';
import { EncoderService } from './encoder.service';
import { EmailService } from './email.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { mailerConfig } from './mailer.config';

@Module({
  imports: [
    MailerModule.forRoot(mailerConfig),
    TypeOrmModule.forFeature([
      Usuario,
      EstadosEntity,
      RolesEntity,
      UsuariosRepository,
    ]),
  ],
  controllers: [UsuariosController],
  providers: [
    UsuariosService,
    UsuariosRepository,
    JwtStrategy,
    EncoderService,
    EmailService,
  ],
  exports: [UsuariosService, UsuariosRepository, JwtStrategy],
})
export class UsuariosModule {}
