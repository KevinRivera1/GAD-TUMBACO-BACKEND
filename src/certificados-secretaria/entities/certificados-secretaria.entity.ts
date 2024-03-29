/*==================CERTIFICADOS-ENTITY==============*/
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
//import { OficiosEntity } from "./oficios.entity";
import { BienesSolicitud } from '../../bienes-solicitud/entities/bienes-solicitud.entity';

@Entity('certificados')
export class CertificadosSecretariaEntity {
  /* Declaracion de campos de la tabla */
  @PrimaryGeneratedColumn()
  id_certificados: number;

  /*Campo Requerimiento*/
  @Column({
    name: 'requerimiento',
    type: 'varchar',
    length: 100,
    comment: 'Accion que se esta solicitando',
  })
  requerimiento: string;

  /*Campo Responsable del certificado*/
  @Column({
    name: 'responsable_certificado',
    type: 'varchar',
    length: 100,
    comment: 'Persona encargada de aprobar el certificado',
  })
  responsable: string;

  /*Campo Fecha de entrega*/
  @Column({
    name: 'fecha_entrega',
    type: 'date',
    comment: 'Fecha de entrega del bien',
  })
  fechaRecibido: Date;

  /*Campo Fecha de emision*/
  @Column({
    name: 'fecha_devolucion',
    type: 'date',
    comment: 'Fecha en la que se emite',
  })
  fechaEmision: Date;

  /*Campo Fecha de real de la devoluucion*/
  @Column({
    name: 'fecha_real_devolucion',
    type: 'date',
    comment: 'Fecha de entrega del bien',
  })
  fechaDevolucion: Date;

  /*Campo Comentario*/
  @Column({
    name: 'comentario',
    type: 'varchar',
    length: 100,
    comment:
      'Es un comentario que se agrega al certificado EJ:Falta especificar el lugar de entrega',
  })
  comentario: string;

  /*Campo Cedula*/
  @Column({
    name: 'cedula',
    type: 'varchar',
    comment:
      'En este campo se debe cargar el archivo referente a la copia de la cedula',
  })
  cedula: string;

  /*Campo Servicio Basico*/
  @Column({
    name: 'servicio_basico',
    type: 'varchar',
    comment:
      'En este campo se debe cargar el archivo referente a un servicio basico Ej:Luz,Agua,etc',
  })
  servicioBasico: string;

  /*Campo Escrituras*/
  @Column({
    name: 'escrituras',
    type: 'varchar',
    comment:
      'En este campo se debe cargar el archivo referente a escrituras de una propiedad',
  })
  escrituras: string;

  /*Campo Oficio*/
  @Column({
    name: 'oficio',
    type: 'varchar',
    comment: 'En este campo se debe cargar el archivo del oficio ya aprobado',
  })
  oficio: string;

  /*Relación uno a uno*/
  // @OneToOne(() => OficiosEntity, oficios => oficios.certificado)
  //oficios: OficiosEntity;

  /*Relacion: una oficcio puede tener varios certificados */
  @OneToMany(
    () => CertificadosSecretariaEntity,
    (oficios_secretaria) => oficios_secretaria.secretaria,
  )
  @JoinColumn({ name: 'id_certificados' })
  secretaria: CertificadosSecretariaEntity[];
  oficios_secretaria: any;

  @OneToMany(() => BienesSolicitud, (solicitudes) => solicitudes.certificados)
  @JoinColumn({ name: 'id_certificados' })
  solicitudes: BienesSolicitud[];

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
