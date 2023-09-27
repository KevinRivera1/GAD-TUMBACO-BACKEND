import { Bienes } from "src/bienes/entities/bienes.entity";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "categorias" })
export class BienesCategoria {
  @PrimaryGeneratedColumn()
  id_categorias: number;

  @Column({
    name: "nombre",
    type: "varchar",
    length: 100,
  })
  nombre_categoria: string;

  @Column({
    name: "descripcion",
    type: "varchar",
    length: 100,
  })
  descripcion_categoria: string;

  // Relación uno a muchos con la tabla bienes
  @OneToMany(() => Bienes, (bienes) => bienes.categorias)
  @JoinColumn({ name: "id_categorias" })
  bienes: Bienes[];

  @CreateDateColumn({
    name: "created_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  createAt: Date;

  @UpdateDateColumn({
    name: "updated_at",
    type: "timestamp",
  })
  updateAt: Date;

  @DeleteDateColumn({ name: "deleted_at", type: "timestamp" })
  deleteAt: Date;
}
