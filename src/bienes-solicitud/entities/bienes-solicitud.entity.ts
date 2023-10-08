import { Bienes } from "src/bienes/entities/bienes.entity";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "bienes_solicitud" })
export class BienesSolicitud {
  @PrimaryGeneratedColumn()
  id_solicitud_bienes: number;

  @Column({
    name: "nombres_responsable",
    type: "varchar",
    length: 100,
    comment: "nombres del responsable",
  })
  nombreResponsable: string;

  @Column({
    name: "apellidos_responsable",
    type: "varchar",
    length: 100,
    comment: "apellidos del responsable",
  })
  apellidoResponsable: string;

  @Column({
    name: "destino",
    type: "varchar",
    comment: "destino de la solicitud",
  })
  destino: string;

  @Column({
    name: "movilizacion",
    type: "varchar",
    length: 100,
    comment: "movilizacion para la solicitud",
  })
  movilizacion: string;

  @Column({
    name: "duracion_evento",
    type: "varchar",
    length: 100,
    comment: "Duracion del evento",
  })
  duracionEvento: string;

  @Column({
    name: "repartidor",
    type: "varchar",
    length: 100,
    comment: "repartidos del bien o bienes",
  })
  repartidor: string;

  @Column({
    name: "receptor",
    type: "varchar",
    length: 100,
    comment: "receptor del bien o bienes",
  })
  receptor: string;

  @Column({
    name: "observacion",
    type: "varchar",
    length: 100,
    comment: "observacion de la solicitud",
  })
  observacion: string;

  @Column({
    name: "estado",
    type: "bool",
    comment: "Se registrará el estado de la solicitud, si esta aprobada o no",
  })
  estado: boolean;

  // Relación muchos a uno con la tabla bienes
  @ManyToOne(() => Bienes, (bienes) => bienes.id_bienes)
  @JoinColumn({ name: "id_bienes" })
  bienes: Bienes;

  @CreateDateColumn({
    name: "created_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  createAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  updateAt: Date;

  @DeleteDateColumn({ name: "deleted_at", type: "timestamp" })
  deleteAt: Date;
}
