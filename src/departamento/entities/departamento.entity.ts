import { Presidencia } from "src/presidencia/entities/presidencia.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('departamentos')
export class Departamento {

  /* Declaracion de campos de la tabla */
    @PrimaryGeneratedColumn()
    id_departamentos: number;

    /*Campo Nombre*/
    @Column({
        name: 'nombre',
        type: 'varchar',
        length: 100,
        comment: 'Nombre de los departamentos',
    })
    nombre: string;

    /*Campo Descripcion*/
    @Column({
        name: 'descripcion',
        type: 'varchar',
        length: 100,
        comment: 'Descripcion de lo que realiza el departamento',
    })
    descripcion: string;

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

     /*Relacion: un oficio puede tener varios departamentos */ 
  /*   @OneToMany(type => OficiosEntity, oficios => oficios.departamentos)
    @JoinColumn({ name: 'id_departamentos' }) 
    oficios: OficiosEntity[];
 */

    

    @OneToOne(() => Presidencia, (presidencia) => presidencia.id_presidencia) // specify inverse side as a second parameter
    @JoinColumn()
    presidencia: Presidencia 

}
