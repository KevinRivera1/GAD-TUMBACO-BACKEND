import { BienesCategoria } from 'src/bienes-categorias/entities/bienes-categoria.entity';
import { BienesSolicitud } from 'src/bienes-solicitud/entities/bienes-solicitud.entity';
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

@Entity({ name: 'bienes' })
export class Bienes {
  @PrimaryGeneratedColumn()
  id_bienes: number;

  @Column({
    name: 'responsable_bien',
    type: 'varchar',
    length: 100,
    comment: 'Se registrará el propietario o titular del bien prestado',
  })
  responsable_bien: string;

  @Column({
    name: 'nombre_bien',
    type: 'varchar',
    length: 100,
    comment: 'Se registrará el nombre o título del bien',
  })
  nombre_bien: string;

  @Column({
    name: 'marca',
    type: 'varchar',
    length: 100,
    comment: 'Se registrará la marca correspondiente del bien',
  })
  marca: string;

  @Column({
    name: 'serie',
    type: 'varchar',
    length: 50,
    comment:
      'Se registrará un numero serial correspondiente al bien para identificarlos a cada uno',
  })
  serie: string;

  @Column({
    name: 'detalle',
    type: 'varchar',
    length: 100,
    comment: 'Se registrará cualquier situación o novedad referente al bien',
  })
  detalle: string;

  @Column({
    name: 'stock',
    type: 'int',
    comment:
      'Se registrará la cantidad disponible del bien para realizar cualquier prestación',
  })
  stock: number;

  @Column({
    name: 'disponibilidad',
    type: 'bool',
    comment:
      'Se registrará la cantidad disponible del bien para realizar cualquier prestación',
  })
  disponibilidad: boolean;

  // Relación muchos a uno con la tabla categorias
  @ManyToOne(() => BienesCategoria, (categorias) => categorias.id_categorias, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({ name: 'id_categorias' })
  categorias: BienesCategoria;

  // Relación uno a muchos con la tabla bienes-solicitud
  @OneToMany(() => BienesSolicitud, (solicitud) => solicitud.bienes, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({ name: 'id_solicitud_bienes' })
  bienesSolicitud: BienesSolicitud[];

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
