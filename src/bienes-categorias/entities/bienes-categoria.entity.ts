import { Bienes } from 'src/bienes/entities/bienes.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'categorias' })
export class BienesCategoria {
  @PrimaryGeneratedColumn()
  id_categorias: number;

  @Column({
    name: 'nombre',
    type: 'varchar',
    length: 100,
    comment: 'Nombre de la categoría',
  })
  nombre_categoria: string;

  @Column({
    name: 'descripcion',
    type: 'varchar',
    length: 100,
    comment: 'Descripción de la categoría',
  })
  descripcion_categoria: string;

  // Relación uno a muchos con la tabla bienes
  @OneToMany(() => Bienes, (bienes) => bienes.categorias)
  @JoinColumn({ name: 'id_categorias' })
  bienes: Bienes[];

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
