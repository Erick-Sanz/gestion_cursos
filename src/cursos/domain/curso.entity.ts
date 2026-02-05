import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
} from 'typeorm';
import { Estudiante } from '../../estudiantes/domain/estudiante.entity';
import { ICurso } from './interfaces/curso.interface';



@Entity('cursos')
export class Curso implements ICurso {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @ManyToMany(() => Estudiante, (estudiante) => estudiante.cursos)
  estudiantes: Estudiante[];
}
