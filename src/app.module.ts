import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BienesCategoriasModule } from "./bienes-categorias/bienes-categorias.module";
import { BienesSolicitudModule } from "./bienes-solicitud/bienes-solicitud.module";
import { BienesModule } from "./bienes/bienes.module";
import { DataSourceconfig } from "./config/data.source";
import { UsuariosModule } from "./usuarios/usuarios.module";
import { DepartamentoModule } from './departamento/departamento.module';
import { RolesModule } from './roles/roles.module';
import { EstadosModule } from './estados/estados.module';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
