import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';
import { ICategoria } from './interfaces/categoria.interface';
import { Curso } from '../../cursos/domain/curso.entity';

@Entity('categorias')
export class Categoria implements ICategoria {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    nombre: string;

    @OneToMany(() => Curso, (curso) => curso.categoria)
    cursos: Curso[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
