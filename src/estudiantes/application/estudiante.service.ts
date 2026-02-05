import { Injectable, NotFoundException } from '@nestjs/common';
import { EstudianteRepositoryPort } from '../domain/estudiante.repository.port';
import { Estudiante } from '../domain/estudiante.entity';
import { CreateEstudianteDto } from '../infrastructure/dto/create-estudiante.dto';
import { UpdateEstudianteDto } from '../infrastructure/dto/update-estudiante.dto';

@Injectable()
export class EstudianteService {
  constructor(private readonly repository: EstudianteRepositoryPort) { }

  async findAll(): Promise<Estudiante[]> {
    return this.repository.findAll();
  }

  async findAllWithCursos(): Promise<Estudiante[]> {
    return this.repository.findAllWithCursos();
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
    if (!estudiante) {
      throw new NotFoundException(`Estudiante ${estudianteId} no encontrado`);
    }
    // We trust the repository to handle the relationship update, 
    // but ideally we should also check if the course exists here or in the repo.
    // For simplicity following the plan, delegate to repository.
    return this.repository.addCurso(estudianteId, cursoId);
  }
}
