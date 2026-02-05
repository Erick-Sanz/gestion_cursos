import { Curso } from './curso.entity';
import { FindCursosArgs } from '../infrastructure/dto/find-cursos.args';
import { CreateCursoDto } from '../infrastructure/dto/create-curso.dto';
import { UpdateCursoDto } from '../infrastructure/dto/update-curso.dto';

export abstract class CursoRepositoryPort {
  abstract findAll(args?: FindCursosArgs): Promise<Curso[]>;
  abstract findAllWithEstudiantes(args?: FindCursosArgs): Promise<Curso[]>;
  abstract findById(id: string): Promise<Curso | null>;
  abstract create(dto: CreateCursoDto): Promise<Curso>;
  abstract update(id: string, dto: UpdateCursoDto): Promise<Curso>;
  abstract delete(id: string): Promise<void>;
}
