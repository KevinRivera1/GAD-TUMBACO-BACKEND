import { Usuario } from 'src/usuarios/entities/usuario.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'roles' })
export class RolesEntity {
  @PrimaryGeneratedColumn()
  id_roles: number;
  @Column({
    name: 'nombre',
    type: 'varchar',
    length: 100,
    comment: 'En este campo se registrara el nombre o identificador del rol',
  })
  nombre: string;

  @Column({
    name: 'descripcion',
    type: 'varchar',
    length: 200,
    comment:
      'Se registrara los detalles o una pequeña descripción que explique el rol a registrar',
  })
  descripcion: string;

  @Column({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de creacion del rol',
  })
  createdAt: Date;

  @Column({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de actualizacion del rol',
  })
  updatedAt: Date;

  @Column({
    name: 'deleted_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha en la que se elimina el rol',
  })
  deleteAt: Date;

  /*Relacion: un rol puede tener varios usuarios */
  @OneToMany((type) => Usuario, (usuario) => usuario.rol)
  @JoinColumn({ name: 'id_roles' })
  usuarios: Usuario[];
}
