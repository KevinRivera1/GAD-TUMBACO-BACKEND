import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: "proyecto" })
export class Proyecto {
  @PrimaryGeneratedColumn()
  id_proyecto: number;

  @Column({
    name: "responsable",
    type: "varchar",
    length: 100,
    comment: "Se registrará el nombre del responsable",
  })
  responsable: string;

  @Column({
    name: "categoria",
    type: "varchar",
    length: 100,
    comment: "Se registrará el nombre de la categoría",
  })
  categoria: string;

  @Column({
    name: "producto",
    type: "varchar",
    length: 100,
    comment: "Se registrará el nombre del proyecto",
  })
  producto: string;

  @Column({
    name: "marca",
    type: "varchar",
    length: 100,
    comment: "Se registrará el nombre de la marca",
  })
  marca: string;

  @Column({
    name: "serial",
    type: "varchar",
    length: 100,
    comment: "Se registrará el número serial",
  })
  serial: string;

  @Column({
    name: "detalle",
    type: "varchar",
    length: 100,
    comment: "Se registrará el detalle",
  })
  detalle: string;

  @Column({
    name: "imagen",
    type: "varchar",
    length: 500,
    comment: "Se registrará la imagen",
  })
  imagen: string;
}
