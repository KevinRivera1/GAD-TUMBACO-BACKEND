import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BienesCategoriasModule } from './bienes-categorias/bienes-categorias.module';
import { BienesSolicitudModule } from './bienes-solicitud/bienes-solicitud.module';
import { BienesModule } from './bienes/bienes.module';
import { DataSourceconfig } from './config/data.source';
import { UsuariosModule } from './usuarios/usuarios.module';
import { DepartamentoModule } from './departamento/departamento.module';
import { RolesModule } from './roles/roles.module';
import { EstadosModule } from './estados/estados.module';
import { DatabaseService } from './Database/database.service';
import { DatabaseModule } from './Database/database.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { ProyectoModule } from './proyecto/proyecto.module';
import { PresidenciaModule } from './presidencia/presidencia.module';
import { OficiosSecretariaModule } from './oficios-secretaria/oficios-secretaria.module';
import { CertificadosSecretariaModule } from './certificados-secretaria/certificados-secretaria.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      ...DataSourceconfig,
      autoLoadEntities: true,
    }),
    BienesModule,
    BienesCategoriasModule,
    BienesSolicitudModule,
    UsuariosModule,
    DepartamentoModule,
    RolesModule,
    EstadosModule,
    DatabaseModule,
    ProyectoModule,
    PresidenciaModule,
    OficiosSecretariaModule,
    CertificadosSecretariaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
