import { EstadosEntity } from 'src/estados/entities/estado.entity';
import { OficiosSecretariaEntity } from 'src/oficios-secretaria/entities/oficios-secretaria.entity';
import { RolesEntity } from 'src/roles/entities/role.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'usuarios' })
export class Usuario {
  @PrimaryGeneratedColumn()
  id_usuarios: number;

  /*Campo nombre del usuario*/
  @Column({
    name: 'nombres',
    type: 'varchar',
    length: 100,
    comment: 'nombres del usuario',
  })
  nombres: string;

  /*Campo apellidos del usuario*/
  @Column({
    name: 'apellidos',
    type: 'varchar',
    length: 100,
    comment: 'apellidos del usuario',
  })
  apellidos: string;

  /*Campo clave del usuario*/
  @Column({
    name: 'clave',
    type: 'varchar',
    length: 260,
    comment: 'clave del usuario',
  })
  clave: string;

  /*Campo correo del usuario*/
  @Column({
    name: 'correo',
    type: 'varchar',
    length: 100,
    comment: 'correo del usuario',
  })
  correo: string;

  /*Campo identificacion del usuario*/
  @Column({
    name: 'identificacion',
    type: 'varchar',
    length: 20,
    comment: 'identificacion del usuario',
  })
  identificacion: string;

  /*Campo celular del usuario*/
  @Column({
    name: 'celular',
    type: 'varchar',
    length: 10,
    comment: 'celular del usuario',
  })
  celular: string;

  @Column({
    type: 'uuid',
    unique: true,
    name: 'reset_password_token',
    nullable: true,
    comment: 'Token para resetear la contraseña',
  })
  resetPasswordToken: string;

  /*Relacion: muchos usarios puede tener un rol */
  @ManyToOne((type) => RolesEntity, (rol) => rol.usuarios)
  @JoinColumn({ name: 'id_roles' })
  rol: RolesEntity;

  /*Relacion: muchos usarios puede tener un estado */
  @ManyToOne((type) => EstadosEntity, (estado) => estado.usuarios)
  @JoinColumn({ name: 'id_estado' })
  estado: EstadosEntity;

  /*Relacion: un usario puede tener varios oficios */
  @OneToMany((type) => OficiosSecretariaEntity, (oficio) => oficio.usuarios)
  @JoinColumn({ name: 'id_oficios' })
  oficios: OficiosSecretariaEntity[];

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    comment: 'Fecha de creación del registro',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    comment: 'Fecha de actualización del registro',
  })
  updateAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
    comment: 'Fecha de eliminación del registro',
  })
  deleteAt: Date;
}
