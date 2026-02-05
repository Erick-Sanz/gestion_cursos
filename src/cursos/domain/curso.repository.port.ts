import { Curso } from './curso.entity';
import { PaginationDto } from '../../common/dto/pagination.dto';

export abstract class CursoRepositoryPort {
  abstract findAll(pagination?: PaginationDto): Promise<Curso[]>;
  abstract findAllWithEstudiantes(pagination?: PaginationDto): Promise<Curso[]>;
  abstract findById(id: string): Promise<Curso | null>;
  abstract create(nombre: string): Promise<Curso>;
}
