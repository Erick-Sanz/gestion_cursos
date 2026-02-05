import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Curso } from '../../cursos/domain/curso.entity';
import { IEstudiante } from './interfaces/estudiante.interface';

@Entity('estudiantes')
export class Estudiante implements IEstudiante {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'date' })
  fechaNacimiento: string;

  @Column({ nullable: true })
  telefono: string;

  @ManyToMany(() => Curso, (curso) => curso.estudiantes)
  @JoinTable({
    name: 'estudiantes_cursos',
    joinColumn: { name: 'estudiante_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'curso_id', referencedColumnName: 'id' },
  })
  cursos: Curso[];
}
