import { Injectable, NotFoundException } from '@nestjs/common';
import { CursoRepositoryPort } from '../domain/curso.repository.port';
import { Curso } from '../domain/curso.entity';
import { CreateCursoDto } from '../infrastructure/dto/create-curso.dto';

@Injectable()
export class CursoService {
  constructor(private readonly repository: CursoRepositoryPort) { }

  async findAll(): Promise<Curso[]> {
    return this.repository.findAll();
  }

  async findAllWithEstudiantes(): Promise<Curso[]> {
    return this.repository.findAllWithEstudiantes();
  }

  async findById(id: string): Promise<Curso> {
    const curso = await this.repository.findById(id);
    if (!curso) {
      throw new NotFoundException(`Curso con id ${id} no encontrado`);
    }
    return curso;
  }

  async create(dto: CreateCursoDto): Promise<Curso> {
    return this.repository.create(dto.nombre);
  }
}
