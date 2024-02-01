import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { CertificadosSecretariaEntity } from '../../certificados-secretaria/entities/certificados-secretaria.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Entity({ name: 'oficios-secretaria' })
export class OficiosSecretariaEntity {
  @PrimaryGeneratedColumn()
  id_oficios: number;

  /*Campo nombre del que firma  la solicitud*/
  @Column({
    name: 'nombres_firmante',
    type: 'varchar',
    length: 100,
    comment: 'nombres del firmante',
  })
  nombreFirmante: string;

  /*Campo apellido del firmante de la solicitud*/
  @Column({
    name: 'apellidos_firmante',
    type: 'varchar',
    length: 100,
    comment: 'apellidos del firmante',
  })
  apellidoFirmante: string;
  /*Campo del asunto de la solicitud*/

  /*Campo de la fecha de recibido de la solicitud*/
  @Column({
    type: 'date',
    name: 'fecha_recibido',
    comment: 'Fecha de recibido del oficio',
  })
  fechaRecibido: Date;

  /*Campo de la fecha que se realizo el oficio de la solicitud*/
  @Column({
    type: 'date',
    name: 'fecha_oficio',
    comment: 'Fecha de realizacion del oficio',
  })
  fechaOficio: Date;

  /*Campo de la organizacion remitente de la solicitud*/
  @Column({
    name: 'organizacion_remitente',
    type: 'varchar',
    comment: 'Organizacion que remite el oficio',
  })
  organizacionRemitente: string;

  /*Campo del archivo de la solicitud*/
  @Column({
    name: 'archivo',
    comment: 'Archivo del oficio',
  })
  archivo: string;

  /*Campo del requerimiento de la solicitud*/
  @Column({
    name: 'requerimiento',
    comment: 'Accion que se esta solicitando',
  })
  requerimiento: string;

  /*Campo de la delegacion de la solicitud*/
  @Column({
    name: 'delegacion',
    comment: 'Delegacion a la que se dirige el oficio',
  })
  delegacion: string;

  /*Campo de la prioridad de la solicitud*/
  @Column({
    name: 'prioridad',
    comment: 'Prioridad del oficio',
  })
  prioridad: string;

  /*Campo del comentario de la solicitud*/
  @Column({
    name: 'comentario',
    comment: 'Comentario del oficio',
  })
  comentario: string;

  /*Campo del estado de la solicitud*/
  @Column({
    name: 'estado',
    comment: 'Se registrará el estado del oficio, si esta aprobada o no',
  })
  estado: string;

  /*Relacion: varios certificados puede tener una solicitud */
  @ManyToOne(
    (type) => CertificadosSecretariaEntity,
    (certificado) => certificado.oficios_secretaria,
  )
  @JoinColumn({ name: 'id_certificados' })
  certificados: CertificadosSecretariaEntity;

  @ManyToOne((type) => Usuario, (usuario) => usuario.id_usuarios)
  @JoinColumn({ name: 'id_usuarios' })
  usuarios: Usuario;
}
