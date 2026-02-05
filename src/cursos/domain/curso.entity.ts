import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ICurso } from './interfaces/curso.interface';
import { Estudiante } from '../../estudiantes/domain/estudiante.entity';
import { Categoria } from '../../categorias/domain/categoria.entity';

@Entity('cursos')
export class Curso implements ICurso {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column()
  categoriaId: string;

  @ManyToOne(() => Categoria, (categoria) => categoria.cursos)
  @JoinColumn({ name: 'categoriaId' })
  categoria: Categoria;

  @ManyToMany(() => Estudiante, (estudiante) => estudiante.cursos)
  estudiantes: Estudiante[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
