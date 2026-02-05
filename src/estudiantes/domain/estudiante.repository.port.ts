import { Estudiante } from './estudiante.entity';
import { FindEstudiantesArgs } from '../infrastructure/dto/find-estudiantes.args';

export abstract class EstudianteRepositoryPort {
  abstract findAll(args?: FindEstudiantesArgs): Promise<Estudiante[]>;
  abstract findAllWithCursos(args?: FindEstudiantesArgs): Promise<Estudiante[]>;
  abstract findById(id: string): Promise<Estudiante | null>;
  abstract create(data: Partial<Estudiante>): Promise<Estudiante>;
  abstract update(id: string, data: Partial<Estudiante>): Promise<Estudiante>;
  abstract delete(id: string): Promise<void>;
  abstract addCurso(estudianteId: string, cursoId: string): Promise<Estudiante>;
}
