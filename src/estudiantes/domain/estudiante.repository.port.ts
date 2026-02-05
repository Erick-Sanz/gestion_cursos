import { Estudiante } from './estudiante.entity';

export abstract class EstudianteRepositoryPort {
  abstract findAll(): Promise<Estudiante[]>;
  abstract findAllWithCursos(): Promise<Estudiante[]>;
  abstract findById(id: string): Promise<Estudiante | null>;
  abstract create(data: Partial<Estudiante>): Promise<Estudiante>;
  abstract update(id: string, data: Partial<Estudiante>): Promise<Estudiante>;
  abstract delete(id: string): Promise<void>;
  abstract addCurso(estudianteId: string, cursoId: string): Promise<Estudiante>;
}
