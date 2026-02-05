import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { EstudianteRepositoryPort } from '../domain/estudiante.repository.port';
import { Estudiante } from '../domain/estudiante.entity';
import { CreateEstudianteDto } from '../infrastructure/dto/create-estudiante.dto';
import { UpdateEstudianteDto } from '../infrastructure/dto/update-estudiante.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@Injectable()
export class EstudianteService {
  constructor(private readonly repository: EstudianteRepositoryPort) { }

  async findAll(pagination?: PaginationDto): Promise<Estudiante[]> {
    return this.repository.findAll(pagination);
  }

  async findAllWithCursos(pagination?: PaginationDto): Promise<Estudiante[]> {
    return this.repository.findAllWithCursos(pagination);
  }

  async findById(id: string): Promise<Estudiante> {
    const estudiante = await this.repository.findById(id);
    if (!estudiante) {
      throw new NotFoundException(`Estudiante con id ${id} no encontrado`);
    }
    return estudiante;
  }

  async create(dto: CreateEstudianteDto): Promise<Estudiante> {
    return this.repository.create(dto);
  }

  async update(id: string, dto: UpdateEstudianteDto): Promise<Estudiante> {
    await this.findById(id);
    return this.repository.update(id, dto);
  }

  async delete(id: string): Promise<void> {
    await this.findById(id);
    return this.repository.delete(id);
  }

  async inscribir(estudianteId: string, cursoId: string): Promise<Estudiante> {
    const estudiante = await this.findById(estudianteId);

    if (estudiante.cursos?.some(curso => curso.id === cursoId)) {
      throw new BadRequestException(`Este estudiante ya esta inscrito en el curso`);
    }

    return this.repository.addCurso(estudianteId, cursoId);
  }
}
