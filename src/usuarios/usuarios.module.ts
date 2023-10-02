import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsuariosController } from "./usuarios.controller";
import { UsuariosService } from "./usuarios.service";
import { Usuario } from "./entities/usuario.entity";
import { EstadosEntity } from "src/estados/entities/estado.entity";
import { RolesEntity } from "src/roles/entities/role.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Usuario,EstadosEntity,RolesEntity])],
    controllers: [UsuariosController],
    providers: [UsuariosService],
  })
  export class UsuariosModule {}
  