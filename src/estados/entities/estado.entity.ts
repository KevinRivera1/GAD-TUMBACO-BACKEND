import { Usuario } from 'src/usuarios/entities/usuario.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'estados' })
export class EstadosEntity {
  @PrimaryGeneratedColumn()
  id_estados: number;

  @Column({
    name: 'nombre',
    type: 'varchar',
    length: 100,
    comment: 'Nombre del estado',
  })
  nombre_estado: string;

  @Column({
    name: 'acronimo',
    type: 'varchar',
    length: 10,
    comment: 'Acronimo del estado',
  })
  acronimo: string;

  @Column({
    name: 'descripcion',
    type: 'varchar',
    length: 200,
    comment: 'Descripcion del estado',
  })
  descripcion_estado: string;

  @Column({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de creacion del candidato',
  })
  createdAt: Date;

  @Column({
    name: 'updated_at', // Nombre de la columna en la base de datos
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de actualizacion del candidato',
  })
  updatedAt: Date;

  @Column({
    name: 'deleted_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha en la que se elimina el candidato',
  })
  deleteAt: Date;

  @Column({
    name: 'bloqueo_expira',
    type: 'timestamptz',
    nullable: true,
    comment: 'Fecha en la que el usuario expira su bloqueo',
  })
  bloqueo_expira: Date;

  /*Relacion: un usuario puede tener varios estados */
  @OneToMany((type) => Usuario, (usuario) => usuario.estado)
  @JoinColumn({ name: 'id_estados' })
  usuarios: Usuario[];
}
