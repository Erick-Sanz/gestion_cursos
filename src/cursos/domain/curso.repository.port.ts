import { Curso } from './curso.entity';

export abstract class CursoRepositoryPort {
  abstract findAll(): Promise<Curso[]>;
  abstract findAllWithEstudiantes(): Promise<Curso[]>;
  abstract findById(id: string): Promise<Curso | null>;
  abstract create(nombre: string): Promise<Curso>;
}
