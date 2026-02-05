import { Injectable, NotFoundException } from '@nestjs/common';
import { CursoRepositoryPort } from '../domain/curso.repository.port';
import { Curso } from '../domain/curso.entity';
import { CreateCursoDto } from '../infrastructure/dto/create-curso.dto';
import { UpdateCursoDto } from '../infrastructure/dto/update-curso.dto';
import { FindCursosArgs } from '../infrastructure/dto/find-cursos.args';

@Injectable()
export class CursoService {
  constructor(private readonly repository: CursoRepositoryPort) { }

  async findAll(args?: FindCursosArgs): Promise<Curso[]> {
    return this.repository.findAll(args);
  }

  async findAllWithEstudiantes(args?: FindCursosArgs): Promise<Curso[]> {
    return this.repository.findAllWithEstudiantes(args);
  }

  async findById(id: string): Promise<Curso> {
    const curso = await this.repository.findById(id);
    if (!curso) {
      throw new NotFoundException(`Curso con id ${id} no encontrado`);
    }
    return curso;
  }

  async create(dto: CreateCursoDto): Promise<Curso> {
    return this.repository.create(dto);
  }

  async update(id: string, dto: UpdateCursoDto): Promise<Curso> {
    await this.findById(id);
    return this.repository.update(id, dto);
  }

  async delete(id: string): Promise<void> {
    await this.findById(id);
    return this.repository.delete(id);
  }
}
